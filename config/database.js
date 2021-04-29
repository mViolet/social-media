const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" })

// const mySecret = process.env.DB_STRING //use env feature provided by Replit.
const mySecret = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwwve.mongodb.net/Cluster0?retryWrites=true&w=majority`

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