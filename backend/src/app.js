const express = require('express');
const userRouter = require('./routers/users.js');
const taskRouter = require('./routers/tasks.js');
require('./db/mongoose.js');

const app = express();
app.use(express.static(`${__dirname}/build`));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', taskRouter);

module.exports = app;
