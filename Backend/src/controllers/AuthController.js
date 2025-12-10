import AuthService from "../services/AuthService.js";
import successHandler from "../utils/successHandler.js";
import tryCatch from "../middlewares/tryCatch.js";

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = tryCatch(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await AuthService.registerService({ firstName, lastName, email, password});

    return successHandler(res, 201, "User registered successfully and Wait Admin ACCEPT YOU", user);
});

/**
 * Login user
 * @route POST /api/users/login
 */
export const login = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const data = await AuthService.loginService({ email, password });

    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return successHandler(res, 200, "Login successful", {
        user: data.userResponse,
        accessToken: data.accessToken
    });
});

/**
 * Refresh access token
 * @route POST /api/users/refresh-token
 */
export const refreshToken = tryCatch(async (req, res, next) => {
    const token = req.cookies.refreshToken;
    const data = await AuthService.refreshTokenService(token);

    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return successHandler(res, 200, "Token refreshed successfully", {
        accessToken: data.accessToken
    });
});

/**
 * Accept/Authorize user (Admin only)
 * @route PATCH /api/users/:id/accept
 */
export const acceptUser = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await AuthService.acceptUserService(id);
    return successHandler(res, 200, "User authorized successfully", user);
});