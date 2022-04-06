# Tech-Blog
 ![badge](https://img.shields.io/badge/License-MIT-brightgreen)

# Description
This blog is used as an organizational tool similar to Wordpress which allows users to publish their blog posts and comment on other users' posts as well. The user can sign up, login, create, edit, and delete a post, and log out. Having a username to login allows for extra added security and so that the user has the ability to come back to their post by logging back in whenever needed.

This application follows the Model View Controller structure by using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.
# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Tests](#tests)
* [Questions](#questions)
# Installation
The user needs to install SQL on their local computer in order to run this application locally.
# Usage
In order to use this app, The user will need to sign up to start. After signing up, they can create, edit, or delete a post in the dashboard section. Once finished, the user can logout of the application and then be able to log back in for next time.
# License
This project is licensed under the MIT license.


# Contributors
 Kourtney
# Tests
The following is needed to run the test: The user will need to clone the repository, run 'npm i', and then 'cd db/', mysql -u root -p, login to sql, then run source schema.sql. After running that command in sql, quit sql by typing 'quit;',run 'npm run seed', 'npm start'. Then open up http://localhost:3001/ on their browser.
# Questions
If you have any questions about the repository, feel free to contact me at kourtney.krogman@gmail.com.

Here is a link to view the repository from Github:
https://github.com/kkrogs/Tech-Blog

Link to Deployed Application on Heroku: https://kourtneys-tech-blog-app.herokuapp.com/

