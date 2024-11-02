const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/configs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const phonebookRouter = require('./controllers/phonebook');

mongoose.set('strictQuery', false);

logger.info.log('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/persons', phonebookRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
