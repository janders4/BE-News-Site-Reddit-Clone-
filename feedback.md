### PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
