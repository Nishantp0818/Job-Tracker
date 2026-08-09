const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // ignore if DNS setting fails
}

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 8000
    });
    console.log(`Connected to DB: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("Database connection error", err.message);
    throw err;
  }
}

module.exports = connectDB;


