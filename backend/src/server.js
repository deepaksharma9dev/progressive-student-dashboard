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
    if (process.env.NODE_ENV !== "production") {
      await createDatabaseIfNotExists();
    }

    await sequelize.authenticate();

    console.log("Database connected successfully");

    await sequelize.sync();

    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();