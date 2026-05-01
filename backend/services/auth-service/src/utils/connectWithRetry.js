const connectWithRetry = async (sequelize, retries = 10, delay = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sequelize.authenticate();
      console.log("MySQL connected successfully");
      return;
    } catch (error) {
      console.log(`MySQL connection failed. Retry ${attempt}/${retries}`);

      if (attempt === retries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default connectWithRetry;