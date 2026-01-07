### MongoDB (Mongoose)

> **Warning** In this article, you'll learn how to create a `DatabaseModule` based on the **Mongoose** package from scratch using custom components. As a consequence, this solution contains a lot of overhead that you can omit using ready to use and available out-of-the-box dedicated `@nestjs/mongoose` package. To learn more, see [here](https://docs.nestjs.com/techniques/mongodb).

[Mongoose](https://mongoosejs.com/) is the most popular [MongoDB](https://www.mongodb.org/) object modeling tool.

#### Getting started[#](https://docs.nestjs.com/recipes/mongodb#getting-started)

To start the adventure with this library we have to install all required dependencies:

```lua
$ npm install --save mongoose
```

The first step we need to do is to establish the connection with our database using `connect()` function. The `connect()` function returns a `Promise`, and therefore we have to create an [async provider](https://docs.nestjs.com/fundamentals/async-components).

database.providers.ts

JS

```javascript
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/nest'),
  },
];
```

> **Hint** Following best practices, we declared the custom provider in the separated file which has a `*.providers.ts` suffix.

Then, we need to export these providers to make them **accessible** for the rest part of the application.

database.module.ts

JS

```perl
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
```

Now we can inject the `Connection` object using `@Inject()` decorator. Each class that would depend on the `Connection` async provider will wait until a `Promise` is resolved.

#### Model injection[#](https://docs.nestjs.com/recipes/mongodb#model-injection)

With Mongoose, everything is derived from a [Schema](https://mongoosejs.com/docs/guide.html). Let's define the `CatSchema`:

schemas/cat.schema.ts

JS

```javascript
import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
```

The `CatsSchema` belongs to the `cats` directory. This directory represents the `CatsModule`.

Now it's time to create a **Model** provider:

cats.providers.ts

JS

```javascript
import { Connection } from 'mongoose';
import { CatSchema } from './schemas/cat.schema';

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
```

> **Warning** In the real-world applications you should avoid **magic strings**. Both `CAT_MODEL` and `DATABASE_CONNECTION` should be kept in the separated `constants.ts` file.

Now we can inject the `CAT_MODEL` to the `CatsService` using the `@Inject()` decorator:

cats.service.ts

JS

```typescript
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
```

In the above example we have used the `Cat` interface. This interface extends the `Document` from the mongoose package:

```typescript
import { Document } from 'mongoose';

export interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
```

The database connection is **asynchronous**, but Nest makes this process completely invisible for the end-user. The `CatModel` class is waiting for the db connection, and the `CatsService` is delayed until model is ready to use. The entire application can start when each class is instantiated.

Here is a final `CatsModule`:

cats.module.ts

JS

```python
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    ...catsProviders,
  ],
})
export class CatsModule {}
```

> **Hint** Do not forget to import the `CatsModule` into the root `AppModule`.

#### Example[#](https://docs.nestjs.com/recipes/mongodb#example)

A working example is available [here](https://github.com/nestjs/nest/tree/master/sample/14-mongoose-base).