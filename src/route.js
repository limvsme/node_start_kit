const main = require('./controller/main');
const calc = require('./controller/calc');

const route = (app) => {
  app.get('/health', main.health);
  app.get('/add', calc.add);
}

module.exports = { route };