import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectionDB from "./src/config/db.js";
import router from "./src/routes/api.js";
import errorHandler from "./src/middlewares/errorHandler.js";

connectionDB();


const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true // Allow cookies
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    return res.send('app work');
});


app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀🏁▶️🚩 server is runing on : http://localhost:${port}`);
})