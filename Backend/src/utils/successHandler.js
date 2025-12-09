const successHandler = (res, statusCode, message = "Success", data) => {
    const status = statusCode ?? 200;
    return res.status(status).json({
        success: true,
        message,
        data
    });
};
export default successHandler;