const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB connected: ${conn.connection.host} ${conn.connection.db.databaseName}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
