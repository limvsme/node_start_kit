const calculator = require('../service/calculatorService');

const add = (req, res) => {
  const { num1 = null, num2 = null } = req.query;

  const number1 = Number(num1);
  const number2 = Number(num2);

  if(isNaN(number1) || isNaN(number2)) {
    return res.status(400).json({
      message: 'num1 and num2 must be number',
    });
  }

  const sum = calculator.add(Number(num1), Number(num2));

  return res.status(200).json({
    result: sum,
  })
};

module.exports = {
  add,
};