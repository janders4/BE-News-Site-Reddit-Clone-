# General

- When you're writing your readme do a commit to remove to instructions and md files that came with this repo. Keep it nice and tidy for employers.

## Migrations and Seeding

- formatDate has a lot of mutation going on. As a general rule if you need a new object, just make a new one rather than constantly mutating things and having to remember to copy them first.
- Returning the call to formatDate in formatComments couples these two functions together. Keep them pure and just giving back their desired outputs with no side effects. This is much more extensible.

## Server - Routing + Error handling

- Your error handlers have .catch blocks attached to them. These should be removed.

## Controllers and Models

- You are responding with the resources themselves, e.g. res.send(articles) You should always respond with an object.
  e.g. res.send({ articles })
- Without it you will fail most of our tests. In the report below I've fixed most of them but you can see how many fail without it.
- The fetchTopics model is constructing the response object. This is controllers responsibility and should happen there.
- This happens in quite a few models. Make the models just return their data and the controllers control the response format.
- You spelt queries wrong on the getCommentById controller.... now I'm just being fussy :P
-

### Utils

- Update the test descriptions for formatDate. `it works` won't tell you anything in the future.
- Some of these util tests are now failing. The utils themselves are fine but you haven't changed the tests.
- The format comments tests are commented out. Feels bad. :(

## Test Output

Your testing is generally very good. You should be more specific with your 200 responses however. It's ok for errors to just assert a status code but a 200 response should be testing for more specific things. Such as a topic query should make sure that each articles is of the requested topic. status 200 is not enough as this isn't different behaviour from no query.

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### GET `/api/articles?author=not-an-author`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists

### PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/1000/comments`

Assertion: expected 200 to equal 404

Hints:

- return 404: Not Found when given a valid `article_id` that does not exist

### POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### POST `/api/articles/10000/comments`

Assertion: expected 201 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

### POST `/api/articles/not-a-valid-id/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request when `POST` contains an invalid article_id

### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

### PATCH `/api/comments/1000`

Assertion: expected 200 to equal 404

Hints:

- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist

### GET `/api/users/not-a-username`

Assertion: expected 200 to equal 404

Hints:

- if a user is not found with a valid `user_id`, use a 404: Not Found status code

### DELETE `/api`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code
