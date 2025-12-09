import express from "express";
const router = express.Router();


router.get('/', (req, res)=>{
    res.json("api work");
})


export default router;
