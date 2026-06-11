import express from "express";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./src/config/corsConfig.js";
import authRouter from "./src/routes/auth.route.js";

const app = express();
const port = process.env.PORT || 7000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
    res.end("Hey welcome to the carefirst clinic backend api's !!!...");
});

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});