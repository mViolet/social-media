const mongoose = require("mongoose");

const mySecret = process.env['DB_STRING'] //use env feature provided by Replit.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mySecret, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
