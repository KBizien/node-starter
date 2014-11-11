# Node-Starter project
ExpressJs - SequelizeJs - PassportJs

## Intro

This project is an [expressJs](http://expressjs.com/) base for build nodeJs API. It use the orm [sequelizeJs](http://sequelizejs.com/) and the module [passportJs](http://passportjs.org/) for users authentications.
You can clone this project and use it to quickly build your node API.

## Quick start

After clone the project, install node modules :

```
cd my_project/
npm install
```

When dependencies are install, we can initialise the config database and sequelize migrations :

```
./node_modules/.bin/sequelize init
```

This command create a config.json file in your config folder. You can edit it and add your config database. You should edit the configuration of your development environment too (config/env folder).

After add your config database, run the migration :

```
./node_modules/.bin/sequelize db:migrate
```

This command create the table user with all their attributes. You can find more explication on the [sequelize website](http://sequelizejs.com/docs/latest/migrations).

You can now start your app :

```
npm start
```

## Social network authentications

For social network authentications, you should create an application on the different social network's website. When you create an app, for exemple a facebook app, facebook give you an ID and a secret key. Add this configurations on the environement file (config/env folder).
Facebook : https://developers.facebook.com/
Twitter :  https://apps.twitter.com/
Google : https://cloud.google.com/

## Tests

Tests are ready to write. They should be placed in the test folder. By default, Node-Starter use the test runner framework [mocha](http://mochajs.org/) but you can remove it and use whatever you want.

You should just run this command to run the tests :

```
npm test
```

## Copyright & License

Copyright (C) 2014 Kévin Bizien - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.