import express from "express";
import cookieParser from "cookie-parser";
import connectionDB from "./src/config/db.js";
import router from "./src/routes/api.js";

connectionDB();


const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    return res.send('app work');
});


app.use('/api', router);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`🚀🏁▶️🚩 server is runing on : http://localhost:${port}`);
})