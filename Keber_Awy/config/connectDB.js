const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
env.config({ path: path.join(__dirname, '../.env') });


const connectDB  = async() => {
  try {
    const dbUrl = process.env.MONGO_URI
    if(!dbUrl) throw new Error('MONGO_URI is not defined');
    await mongoose.connect(dbUrl);
    console.log('DataBase connected..................');
  } catch (error) {
    console.error('DataBase connection failed..................');
  }
};


module.exports = connectDB;