### Documentation

**Compodoc** is a documentation tool for Angular applications. Since Nest and Angular share similar project and code structures, **Compodoc** works with Nest applications as well.

#### Setup[#](https://docs.nestjs.com/recipes/documentation#setup)

Setting up Compodoc inside an existing Nest project is very simple. Start by adding the dev-dependency with the following command in your OS terminal:

```ruby
$ npm i -D @compodoc/compodoc
```

#### Generation[#](https://docs.nestjs.com/recipes/documentation#generation)

Generate project documentation using the following command (npm 6 is required for `npx` support). See [the official documentation](https://compodoc.app/guides/usage.html) for more options.

```ruby
$ npx @compodoc/compodoc -p tsconfig.json -s
```

Open your browser and navigate to [http://localhost:8080](http://localhost:8080/). You should see an initial Nest CLI project:

![](https://docs.nestjs.com/assets/documentation-compodoc-1.jpg)

![](https://docs.nestjs.com/assets/documentation-compodoc-2.jpg)

#### Contribute[#](https://docs.nestjs.com/recipes/documentation#contribute)

You can participate and contribute to the Compodoc project [here](https://github.com/compodoc/compodoc).