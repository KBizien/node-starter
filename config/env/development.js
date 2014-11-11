module.exports = {
  db: {
    username: "root", // your database username
    password: null, // your database password
    database: "database_development", // your database name
    host: "127.0.0.1", // your database host
    dialect: "mysql" // or pgsql, sqlite, mariaDB…
  },
  facebookAuth : {
    clientID      : 'your_client_id',
    clientSecret  : 'your_client_secret',
    callbackURL   : 'your_callback_url'
  },
  twitterAuth : {
    consumerKey       : 'your_consumer_key',
    consumerSecret    : 'your_consumer_secret',
    callbackURL       : 'your_callback_url'
  },
  googleAuth : {
    clientID      : 'your_client_id',
    clientSecret  : 'your_client_secret',
    callbackURL   : 'your_callback_url'
  }
}