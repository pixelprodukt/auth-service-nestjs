## Setup docker container

Start the docker container for the postgres database. The init script will create the tables and seed them with some test data.

```bash
$ docker compose up
```

Docker will also start an instance of Adminer (https://www.adminer.org/de/) under http://localhost:8080. Select `PostgreSQL`, credentials are:
```
user: admin
password: admin
database: auth-database
```


## Compile and run the project

Install dependencies from npm
```bash
$ npm install
```

and start service
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests (there are not tests at the moment)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## http Folder
If you are using vs code as your editor, you can just install the Rest Client extension from the [marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). In the http file are some example requests to test the api manually. If you're using intellij, chances are good that you can use the file out of the box.

From the original readme:
## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
