# Node-Starter project
ExpressJs - SequelizeJs - PassportJs

## Intro

This project is an [ExpressJs](http://expressjs.com/) base to build NodeJs API. It use the orm [SequelizeJs](http://sequelizejs.com/) and the module [PassportJs](http://passportjs.org/) for user authentication.
You can clone this project and use it to quickly build your Node API.

## Quick start

After cloning the project, install Node modules :

```
cd my_project/
npm install
```

When dependencies are installed, we can initialise the database config and sequelize migrations :

```
./node_modules/.bin/sequelize init
```

This command create a config.json file in your config folder. You can edit it and add your database config. You should create a .env file and edit your environment variables inside :
DB_USERNAME = "your_username_database"
DB_PASSWORD = "your_password_database"
DB_DATABASE = "your_name_database"
DB_HOST = "your_host_database"
DB_DIALECT = "your_dialect_database"
DB_PORT = your_port_database

MAIL_SERVICE = "your_service"
MAIL_USER = "your_email"
MAIL_PASSWORD = "your_password_email"
MAIL_FROM = "your_from_email"


When your database config is set, run the migration :

```
./node_modules/.bin/sequelize db:migrate
```

This command create the user table with all its attributes. You can find more explication on the [Sequelize website](http://sequelizejs.com/docs/latest/migrations).

You can now start your app :

```
npm start
```

## Social network authentications

For social network authentications, you should create an application on each social network's website. When you create an app, for exemple a facebook app, facebook give you an ID and a secret key. Add this configurations on the environement file (.env).
Facebook : https://developers.facebook.com/
Twitter :  https://apps.twitter.com/
Google : https://cloud.google.com/

Default name of variables to use :

FACEBOOK_AUTH_CLIENT_ID = "your_facebook_client_id"
FACEBOOK_AUTH_CLIENT_SECRET = "your_facebook_client_secret"
FACEBOOK_AUTH_CALLBACK_URL = "your_facebook_callback_url"

TWITTER_AUTH_CONSUMER_KEY = "your_twitter_consumer_key"
TWITTER_AUTH_CONSUMER_SECRET = "your_twitter_consumer_secret"
TWITTER_AUTH_CALLBACK_URL = "your_twitter_callback_url"

GOOGLE_AUTH_CLIENT_ID = "your_google_client_id"
GOOGLE_AUTH_CLIENT_SECRET = "your_google_client_secret"
GOOGLE_AUTH_CALLBACK_URL = "your_google_callback_url"

## Copyright & License

Copyright (C) 2014-2015 Kévin Bizien - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
