module.exports = {
  db: {
    username: "root", // your database username
    password: null, // your database password
    database: "database_development", // your database name
    host: "127.0.0.1", // your database host
    dialect: "mysql" // or pgsql, sqlite, mariaDB…
  },
  mail: {
    service: "your_service", // your email service (ex: Gmail)
    user_mail: "your_user_mail", // your email user for password reset
    pass_mail: "your_password_mail", // your pwd user for password reset
    from_mail: "your_from_mail" // "from" on email send to users
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