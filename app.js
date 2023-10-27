require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const rateLimit = require('./middlewares/rateLimit');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT, DB_URL } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config');
const { applicationStartMsg, connectedDbMsg } = require('./utils/constants');

mongoose.connect(DB_URL || DEFAULT_DATABASE, {
  useNewUrlParser: true,
}).then(() => {
  console.log(connectedDbMsg);
});

app.use(helmet());
app.use(rateLimit);
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`${applicationStartMsg} ${PORT || DEFAULT_PORT}`);
});
