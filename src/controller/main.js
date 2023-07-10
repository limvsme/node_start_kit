const health = (req, res) => {
  console.info('Call health check!!');

  return res.status(200).json({
    message: 'health check',
  });
}

module.exports = {
  health,
}
