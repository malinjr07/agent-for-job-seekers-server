In NestJS v11, the standard and most effective approach to validating payloads and preventing empty data from reaching your database is by using the combination of class-validator and class-transformer libraries, integrated with the built-in ValidationPipe. 
Key Tools & Formula
class-validator: A library that provides a rich set of decorators (@IsString(), @IsNotEmpty(), etc.) to define validation rules within your Data Transfer Objects (DTOs).
class-transformer: A complementary library that transforms plain JavaScript objects (the incoming payload) into instances of your DTO classes, allowing the validation decorators to work correctly.
ValidationPipe: A built-in NestJS pipe that leverages the above libraries to automatically validate all incoming request payloads. If validation fails, it automatically throws a BadRequestException, preventing the invalid data from ever reaching your controller logic or database. 
How to Implement and Handle Empty Data
1. Install Necessary Packages 
You need to install the required libraries if they aren't already present in your v11 project:
bash
npm install class-validator class-transformer


2. Define a DTO with Validation Decorators 
Create a DTO file in your feature module (e.g., src/modules/users/dtos/create-user.dto.ts) and use the decorators to enforce rules, including checking for empty data: 
typescript
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' }) // Ensures the string is not empty
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsOptional() // Allows the field to be null or undefined, but if present, must be a string
  address?: string; 
}


The @IsNotEmpty() decorator is specifically designed to handle cases where a property might be an empty string, null, or undefined, ensuring that required fields have actual data. 
3. Enable the ValidationPipe Globally 
For a best-practice approach, enable the ValidationPipe globally in your main.ts file. This intercepts all incoming requests across your entire application and applies the validation logic defined in your DTOs: 
typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips properties that do not have any validation decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
    transform: true, // Automatically transforms payload objects to DTO class instances
  }));
  await app.listen(3000);
}
bootstrap();


Enabling the pipe globally prevents invalid data from reaching your controllers. If an empty payload is sent for a DTO with @IsNotEmpty decorators, the pipe will automatically return a 400 Bad Request error to the client, preventing any data from being processed or stored in the DB. 
4. Use the DTO in Your Controller 
In your controller, simply use the DTO in your handler method's @Body() decorator:
typescript
// src/modules/users/controllers/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // If we reach here, the payload is guaranteed to be validated and not empty.
    return this.usersService.create(createUserDto); 
  }
}


This setup ensures robust validation at the application boundary, making sure only clean, valid data is passed to your services and ultimately saved to the database. 