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
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'facebookToken',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'facebookEmail',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'facebookName',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterId',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterToken',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterDisplayName',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'twitterUsername',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'googleId',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'googleToken',
      DataTypes.STRING
    )
    .done(done);

    migration.addColumn(
      'Users',
      'googleEmail',
      DataTypes.STRING
    ).done(done);

    migration.addColumn(
      'Users',
      'googleName',
      DataTypes.STRING
    ).done(done);
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
    migration.removeColumn('Users', 'facebookToken').done(done);
    migration.removeColumn('Users', 'facebookEmail').done(done);
    migration.removeColumn('Users', 'facebookName').done(done);
    migration.removeColumn('Users', 'twitterId').done(done);
    migration.removeColumn('Users', 'twitterToken').done(done);
    migration.removeColumn('Users', 'twitterDisplayName').done(done);
    migration.removeColumn('Users', 'twitterUsername').done(done);
    migration.removeColumn('Users', 'googleId').done(done);
    migration.removeColumn('Users', 'googleToken').done(done);
    migration.removeColumn('Users', 'googleEmail').done(done);
    migration.removeColumn('Users', 'googleName').done(done);
  }
};
