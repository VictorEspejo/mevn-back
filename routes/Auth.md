# Authentication Routes

## POST /register
Registers a new user.
- Validations: `bodyRegisterValidator`
- Controller: `register`
- Parameters: `email`, `password`, `repassword`

## POST /login
Logs in an existing user.
- Validations: `bodyLoginValidator`
- Controller: `login`
- Parameters: `email`, `password`

## GET /refresh
Refreshes a user's token.
- Middleware: `requireRefreshToken`
- Controller: `refreshToken`
- Parameters: None (Token is taken from cookies)

## GET /logout
Logs out a user.
- Controller: `logout`
- Parameters: None (Token is taken from cookies)

## GET /protected
Gets user information.
- Middleware: `requireToken`
- Controller: `infoUser`
- Parameters: None (Token is taken from cookies)

