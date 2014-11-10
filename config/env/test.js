module.exports = {
  db: {
    username: "root",
    password: null,
    database: "andzup",
    host: "127.0.0.1",
    dialect: "mysql"
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