// requiring knex and connecting to the database
const knex = require ('knex') ({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'Flicks',
    },
  });

  module.exports = knex;