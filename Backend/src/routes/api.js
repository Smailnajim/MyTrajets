import express from "express";
import { register, login, refreshToken, acceptUser } from "../controllers/AuthController.js";
import { registerValidation, loginValidation, validate } from "../validators/authValidator.js";
import isAuth from "../middlewares/isAuth.js";
import permitions from "../enums/permitions.js";
const router = express.Router();


router.get('/', (req, res) => {
    res.json("api work");
});


router.post('/users/register', registerValidation, validate, register);
router.post('/users/login', loginValidation, validate, login);
router.post('/users/refresh-token', refreshToken);
router.patch('/users/:id/accept', isAuth, iCan(permitions.accept_user), acceptUser);

export default router;