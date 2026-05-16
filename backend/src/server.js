const app = require("./app");

const {
  sequelize,
  createDatabaseIfNotExists,
} = require("./config/db");

require("./models");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // create db if missing
    await createDatabaseIfNotExists();

    // connect sequelize
    await sequelize.authenticate();

    console.log(
      "Database connected successfully"
    );

    // sync models
    await sequelize.sync();

    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();