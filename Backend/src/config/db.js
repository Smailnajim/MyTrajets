import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("conection with db");
    } catch (error) {
        console.log(`conection with db is filed: ${error.message}`);
        process.exit(1);
    }
}
export default connectionDB;