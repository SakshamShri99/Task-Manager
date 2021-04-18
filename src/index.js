const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = require('./routers/users.js');
const taskRouter = require('./routers/tasks.js');
require('./db/mongoose.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
