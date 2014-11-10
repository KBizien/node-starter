module.exports = {
  db: {
    username: "root",
    password: null,
    database: "andzup",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  facebookAuth : {
    clientID      : '870146696350650',
    clientSecret  : '01ba3739436ab62e65d8b4029647b7f4',
    callbackURL   : 'http://localhost:3000/auth/facebook/callback'
  },
  twitterAuth : {
    consumerKey       : 'XzIx2w5odJgu8n7sBuNvmDBCY',
    consumerSecret    : 'OnDLzZO5q3HwVOLkUS11NgbWu1ymvFq0bN1zqmetJ6pjMrKV4c',
    callbackURL       : 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  googleAuth : {
    clientID      : '652771640981-jgooj48ua83i7rj68uhqc67bplqov35o.apps.googleusercontent.com',
    clientSecret  : '9sJaFbbR9I5A8T0hAA4MnG4N',
    callbackURL   : 'http://localhost:3000/auth/google/callback'
  }
}