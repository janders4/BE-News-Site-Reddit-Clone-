# News Site Clone

A node.js and express API sat on a postgres database for a news website based on Reddit.

Found at: https://reddit-clone-john.herokuapp.com/api/articles/1/comments

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

node version 10 or higher
PostgreSQL version 11 or higher
npm version 6 or higher

### Installing

You will need to have Node installed before installing other dependencies. Information on how to do this can be found at the Node website.

Installation
Clone this repository
git clone https://github.com/timothydowd/BE-NC-News.git
Install the dependencies

```
npm install
```

Run the "setup:dbs" script

```
npm run setup:dbs
```

Run the "seed" script

```
npm run seed
```

Run the 'start' script to start running the server locally

```
npm start
```

## Running the Tests

The test suite for this project utilises Mocha and Supertest.

run the following script to set up the test enivronment and then run the tests:

```
npm install -D
npm test
```

## Usage

Once the server is up and running the following endpoints and methods will be available.

Note: GET request can be ran from a browser using "localhost:9090" before an endpoint, however all other methods will require an API testing tool.

/api: GET - will respond with an object containing the endpoints along with an description of what will return and any rules for the method.

## Deployment

To view a deployed version of this site, go to:

https://reddit-clone-john.herokuapp.com/api/articles/1/comments

## Built With

- node.js - https://nodejs.org/en/ - JavaScript runtime language
- express - https://expressjs.com/ - Lightweight back end framework used to build the API/Server
- knex.js - https://knexjs.org/ - SQL query builder
- postgres - https://www.postgresql.org/ - relational database system
- Heroku - https://dashboard.heroku.com/ - The hosting website for the application

## Authors

- **John Anderson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
