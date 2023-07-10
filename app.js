const express = require('express');
const { route } = require('./src/route');

const app = express();

const PORT = 3000;

const runServer = (serverApp) => {
  serverApp.listen(PORT, () => {
    console.info(`app listening on port ${PORT}!`);
  });

  route(serverApp);
}

runServer(app);