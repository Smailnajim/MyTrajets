import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email, roleId: user.roleId },
        process.env.TOKEN_SECRET,
        { expiresIn: "30m" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.TOKEN_SECRET);
};