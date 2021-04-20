const express = require('express');
const userRouter = require('./routers/users.js');
const taskRouter = require('./routers/tasks.js');
require('./db/mongoose.js');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
