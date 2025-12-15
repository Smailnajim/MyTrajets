const createError = (message, statusCode, errorData = null) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    if(errorData) error.errorData = errorData;
    return error;
};
export default createError;