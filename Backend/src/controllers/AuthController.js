import AuthService from "../services/AuthService.js";
import successHandler from "../utils/successHandler.js";
import tryCatch from "../middlewares/tryCatch.js";

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = tryCatch(async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    const Data = await AuthService.registerService({ firstName, lastName, email, password, roleId });

    res.cookie("refreshToken", Data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return successHandler(res, 201, "User registered successfully", {user: Data.userResponse, accessToken: Data.accessToken});
});