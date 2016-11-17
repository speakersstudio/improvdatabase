# Hello!

## Running the app

Here's a general outline of how to get the Improv Database app running locally!

1.  Pull the repository down to a folder on your computer (duh)
2. Install NodeJS and PostgreSQL
3. Run the command `npm install` on the root project folder. This installs all of the dependencies for the app.
4. Create and set up a PostgreSQL database (see below)
5. `npm start` should start the app in a terminal
6. Visit localhost:1919 to access the webapp, and localhost:1919/api to get the API.

---

## Setting up the database

This is required to get the app running.

1. In PGAdmin create a user called `sdbuatyadcczhj` (these are the users generated for the app in the Heroku Postgres plugin)
2. Now create a database called `d1ihmfmjooehcl` (make sure you set that user as the owner)
3. Locate the postgresql folder in the project, which contains the latest backup of the database (probably not the safest system, but it works for now)
4. Use PGAdmin's `restore` function to import the latest BACKUP file from that folder

---

## See more in the Wiki