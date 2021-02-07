# ng-express-sessions

This repository is my notes learning about and using Sessions/Cookies in Express (`express-sessions`) and implementing a corresponding front-end in Angular.

<h2 id = 'day-1'>Day 1</h2>

### Tasks accomplished:
- Created auto-generated frontend code
- Created Express application and included `express-sessions`
- Created basic routes for registering a user and getting current user info
- Created basic middleware for required parameters

### Notes
- While JWT is generally used for stateless backends, Sessions are stored on the server memory and makes the backend stateful.
- Basic Session implementations can access data directly from the server code (eg. an array of users), but Sessions Stores ideally should be used. These are databases that store user sessions. In the event that the backend crashes, the sessions are still stored in the database (until the session expires).
- Cookies should be configured to `{ secure: true }` for Production environments. This restricts cookies to work only on HTTPS connections.
- `req.session` has information on the current session. Useful for checking if the user exists, is logged on, if the session expired, etc.
- `req.session.save()` is typically called at the end of the HTTP request if `req.session` is altered. This stores the session from memory back into the store. However, for specific scenarios, you may want to call this message yourself. Different stores implement this method differently.