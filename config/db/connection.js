const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connecting', () => {
  console.log(chalk.cyanBright('making initial connection with mongoDB server'));
});

mongoose.connection.on('connected', () => {
  console.log(chalk.cyanBright('connection successfull with mongoDB server'));
});

mongoose.connection.on('disconnecting', () => {
  console.log(chalk.cyanBright('disconnecting mongoDB server upon calling connection.close()'));
});


mongoose.connection.on('close', () => {
  console.log(chalk.cyanBright('disconnecting mongoDB server upon calling connection.close()'));
});


mongoose.connection.on('disconnected', () => {
  console.log(chalk.cyanBright('connection to mongoDB server lost due to database server crash, network connectivity issues or explicitly closing connection'));
});

mongoose.connection.on('reconnected', () => {
  console.log(chalk.cyanBright('mongoDB successfully reconnected after losing connection to mongoDB server'));
});

module.exports = connection;


