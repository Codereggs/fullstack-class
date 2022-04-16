module.exports = (error, request, response) => {
  console.error(error);
  if (error.name === 'CastError') {
    response
      .status(400)
      .send('<h1>Not Found</h1>')
      .json({
        error: 'Not found.',
      })
      .end();
  } else {
    response.status(500).end();
  }
};
