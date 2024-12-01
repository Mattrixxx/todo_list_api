module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const details = err.details || null;
  
    res.status(statusCode).json({
      message: message,
      ...(details && { details }),
    });
  };
  