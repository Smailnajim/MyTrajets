import { registerService } from "../services/AuthService.js";
import successHandler from "../utils/successHandler.js";

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = tryCatch(async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    const user = await registerService({ firstName, lastName, email, password, roleId });
    return successHandler(res, 201, "User registered successfully", user);
});