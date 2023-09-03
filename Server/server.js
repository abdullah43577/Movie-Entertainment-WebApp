require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router');
const cookieParser = require('cookie-parser');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev')); // log details to the console for every request made to the browser;
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
); // allows requests from all origins
app.use(cookieParser());

const dbURI = `mongodb+srv://officialayo540:flicksondemand_server_pass@flicksondemandserver.fsbfyqx.mongodb.net/flicksondemand_user_db`;

(async function () {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  } catch (err) {
    console.log('mongodb not connected', err);
  }
})();

app.use(router);
