const successHandler = (res, message = "Success", data) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};
export default successHandler;