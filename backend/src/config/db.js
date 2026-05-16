const { Sequelize } = require("sequelize");
const { Client } = require("pg");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL || 
  `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'student_dashboard'}`;

const createDatabaseIfNotExists = async () => {
  try {
    const dbUrl = new URL(DATABASE_URL);

    const databaseName = dbUrl.pathname.replace("/", "");

    // connect to default postgres database
    const defaultDbUrl =
      `${dbUrl.protocol}//${dbUrl.username}:${dbUrl.password}` +
      `@${dbUrl.hostname}:${dbUrl.port}/postgres`;

    const client = new Client({
      connectionString: defaultDbUrl,
    });

    await client.connect();

    // check database exists or not
    const checkDbQuery = `
      SELECT 1
      FROM pg_database
      WHERE datname = $1
    `;

    const result = await client.query(
      checkDbQuery,
      [databaseName]
    );

    if (result.rows.length === 0) {
      console.log(
        `Database "${databaseName}" does not exist. Creating...`
      );

      await client.query(
        `CREATE DATABASE "${databaseName}"`
      );

      console.log(
        `Database "${databaseName}" created successfully`
      );
    } else {
      console.log(
        `Database "${databaseName}" already exists`
      );
    }

    await client.end();
  } catch (error) {
    console.error(
      "Database creation failed:",
      error.message
    );

    throw error;
  }
};

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
  createDatabaseIfNotExists,
};