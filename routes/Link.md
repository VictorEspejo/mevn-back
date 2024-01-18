## GET / 
Gets all links.
- Middleware: `requireToken`
- Controller: `getLinks`
- Parameters: None (Token is taken from cookies)

## POST /
Creates a new link.
- Middleware: `requireToken`, `bodyLinkValidator`
- Controller: `createLink`
- Parameters: `longLink`, `nanoLink`(optional) (Token is taken from cookies)

## GET /:nanoLink
Gets a specific link by nanoLink.
- Controller: `getNanoLink`
- Parameters: `nanoLink` (in URL)

## DELETE /:id
Deletes a specific link by id.
- Middleware: `requireToken`, `paramsLinkValidator`
- Controller: `removeLink`
- Parameters: `id` (in URL) (Token is taken from cookies)

## PATCH /:id
Updates a specific link by id.
- Middleware: `requireToken`, `bodyLinkValidator`
- Controller: `updateLink`
- Parameters: `id` (in URL) `longLink` (Token is taken from cookies)
