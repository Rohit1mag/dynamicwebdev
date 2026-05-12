import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("debug", true);
export function connect(dbname) {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}`;
    mongoose.connection.on("connected", () => {
        console.log(`connected to Mongo: ${dbname}`);
    });
    mongoose.connection.on("error", (err) => {
        console.error("Mongo connection error:", err);
    });
    mongoose
        .connect(uri)
        .catch((err) => console.error("Mongo initial connect failed:", err));
}
