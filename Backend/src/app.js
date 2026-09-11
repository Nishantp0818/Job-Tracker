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
  'https://job-tracker-rose-theta.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    const isAllowed = 
      cleanOrigin.endsWith('.vercel.app') ||
      allowedOrigins.some(o => o && o.replace(/\/$/, '') === cleanOrigin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);

module.exports = app;