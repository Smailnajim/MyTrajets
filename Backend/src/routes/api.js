import tryCatch from "../middlewares/tryCatch.js";
import successHandler from "../utils/successHandler.js"
import express from "express";
const router = express.Router();


router.get('/', (req, res)=>{
    res.json("api work");
})

router.post('/users/register', tryCatch((req, res)=>{
    successHandler(res, 200, "use post to create user successfly!", undefined);
}));

export default router;