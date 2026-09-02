const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const cookieparser = require('cookie-parser');
const jobRouter = require('./routes/job.routes');

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, origin);
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);

module.exports = app;



