"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.changeColumn(
      'Users',
      'username',
      {
        type: DataTypes.STRING,
        unique: true
      }
    ).done(done);

    migration.addColumn(
      'Users',
      'email',
      {
        type: DataTypes.STRING,
        unique: true
      }
    ).done(done);

    migration.addColumn(
      'Users',
      'facebookId',
      DataTypes.INTEGER
    ).done(done);

    migration.addColumn(
      'Users',
      'facebookToken',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterId',
      DataTypes.INTEGER
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterToken',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'googleId',
      DataTypes.INTEGER
    ).done(done);

    migration.addColumn(
      'Users',
      'googleToken',
      DataTypes.STRING
    )
    .done(done);
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.changeColumn(
      'Users',
      'username',
      {
        type: DataTypes.STRING
      }
    ).done(done);
    migration.removeColumn('Users', 'email').done(done);
    migration.removeColumn('Users', 'facebookId').done(done);
    migration.removeColumn('Users', 'facebookToken').done(dne);
    migration.removeColumn('Users', 'twitterId').done(done);
    migration.removeColumn('Users', 'twitterToken').done(dne);
    migration.removeColumn('Users', 'googleId').done(done);
    migration.removeColumn('Users', 'googleToken').done(done);
  }
};
