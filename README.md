# TinyEcommerce

FrontEnd for the TinyEcommerce project.

## Development environment.

Requires **NodeJS** installed since this is an Angular project.

**Steps:**
 - Clone the repo
 - Run: `npm install`
 - Run: `ng serve`
 - Open your browser on localhost:4200

## Usage

The app provides two demo users, one with the ADMIN role, one with only the USER role.

**Admin credentials:** admin - 1234

**User credentials:** john - 1234

**Registration of new users is possible**, but these users will have the USER role by default, thus they won't be able to access the admin panel.

The app remembers the user logged in and it won't end the session unless it's manually triggered by the user.

The app remembers the cart as long as the user is logged in. Closing the browser will not delete the cart, but login out will delete the cart info for that user.