import express from "express";
import configurationMiddleware from "./config/middleware.js";
import pangansRouter from "./controller/pangan.js";
import authRouter from "./controller/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
configurationMiddleware(app);

app.use("/auth", authRouter);
app.use("/pangan", pangansRouter);

const port = process.env.APP_PORT;
app.listen(port, () => {

  console.log(`running server on port ${port}`);
});

// test