import dotenv from "dotenv";
dotenv.config();

const errorHandler = (err, req, res, next) => {
    const mode = process.env.MODE || "pro";
    const statusCode = err.statusCode || 500;

    if(mode == "pro")
        return res.status(statusCode).json({
            success: false,
            message: err.message,
        });

    return res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error: err
    });

};
export default errorHandler;