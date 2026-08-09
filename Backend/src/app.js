const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const cookieparser = require('cookie-parser');
const jobRouter = require('./routes/job.routes');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);

module.exports = app;



