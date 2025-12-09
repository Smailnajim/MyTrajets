import express from "express";
import { register } from "../controllers/AuthController.js";
import { registerValidation, validate } from "../validators/authValidator.js";
const router = express.Router();


router.get('/', (req, res) => {
    res.json("api work");
});


router.post('/users/register', registerValidation, validate, register);

export default router;