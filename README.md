<h1 align="center">
  <img alt="Rentx" title="Rentx" width="350px"  src=".github/logo.svg" />
</h1>

<h3 align="center">
  Easy way to rent a car
</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/eliasgcf/"><img alt="Made by" src="https://img.shields.io/badge/made%20by-Elias%20Gabriel-%23DC1637"></a>
  <img alt="GitHub" src="https://img.shields.io/github/license/EliasGcf/rentx?color=%23DC1637">
</p>

<p align="center">
  <a href="#-technologies">Technologies</a> •
  <a href="#-getting-started">Getting started</a> •
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=Rentx%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FEliasGcf%2Frentx%2Fmain%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 🚀 Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JSON Web Token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

**Clone the project and access the folder**

```bash
git clone https://github.com/EliasGcf/rentx.git && cd rentx
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Start all the services and the application with Docker Compose
$ docker-compose up -d

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with 💜&nbsp; by <a href="https://www.linkedin.com/in/eliasgcf/">Elias Gabriel</a>
</p>
