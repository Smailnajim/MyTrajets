import express from "express";
import { register, login, refreshToken } from "../controllers/AuthController.js";
import { registerValidation, loginValidation, validate } from "../validators/authValidator.js";
const router = express.Router();


router.get('/', (req, res) => {
    res.json("api work");
});


router.post('/users/register', registerValidation, validate, register);
router.post('/users/login', loginValidation, validate, login);
router.post('/users/refresh-token', refreshToken);

export default router;