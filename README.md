<h1 align="center" id="title">Sisal Nest App</h1>

<p align="center"><img src="https://imgur.com/a/CTRwj7K" alt="project-image"></p>

<p id="description">After the project is installed you can access the Swagger documentation at <a href="http://localhost:3003/api" target="_blank"> http://localhost:3003/api</a> </p>

<h3>Default admin user:</h3>

<p> <b>Email :</b>  admin@sisal.com <br>  <b>Password :</b> iLoveSisal</p>

<h2>🧐 Features</h2>

Here're some of the features:

- NestJS application with Prisma ORM for database interactions.
- MySQL database.
- Dockerized application for easy deployment.
- Authentication module with Passport JWT for user authentication.
- CRUD operations for managing user data.
- Reddit module for fetching posts from Reddit.
- Unit tests for services using Jest.
- API documentation using Swagger.
- ESLint and Prettier configurations for code formatting.
- Database seed script to create a default admin user.

<h2>🚀 Technologies</h2>

Here're some of the used tecnologies:

- Typescript
- NestJS
- PrismaORM
- MySQL
- Docker
- Jest
- Swagger
- ESLint

<h2>🧾 Prerequisites</h2>

Before you begin, ensure you have met the following requirements:

- Node.js installed (version ^16.0.0)
- Docker installed
- MySQL database setup on Docker
- Set environment folder and files

<h2>🛠️ Standalone Installation:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/enescloud/sisal-nest-app.git
```

<p>2. Install Project</p>

```
yarn install
```

<p>3. Set Environment Files</p>

```
mv env1.example .env
```

```
mkdir env
```

```
mv env2.example env/.env.dev
```

<p>4. Build Mysql Database on Docker</p>

```
docker compose -f docker/docker-compose.dev.yml up --build -d mysql
```

<p>5. Migrate Database</p>

```
yarn migrate
```

<p>6. Run Tests</p>

```
yarn test
```

<p>7. Create Admin User in Database</p>

```
yarn seed
```

<p>8. Start Application</p>

```
yarn start:debug <b>or</b> yarn start:dev
```

<h2>📝 Notes</h2>

<p>You can use <b>Prisma Stuido</b> for checking data on UI</p>

```
npx prisma studio
```
