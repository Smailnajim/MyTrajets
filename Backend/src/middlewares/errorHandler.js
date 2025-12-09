const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    return res.status(statusCode).json({
        success: false,
        status,
        message: err.message,
        stack: err.stack,
        error: err
    });

};

export default errorHandler;