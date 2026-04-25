// Correcting the export to default
const errorMiddleware = (err, req, res, next) => {
  // Error handling logic
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
