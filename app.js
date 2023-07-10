const express = require('express');
const cors = require('cors');
const userRouter = require('./src/router/user-router');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use('/api', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
