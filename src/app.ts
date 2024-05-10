import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"

import authRouter from './routes/auth'

dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use(authRouter)

async () => {
    try {
        const dbURL: string = process.env.DATABASE_URL || ""
        await mongoose.connect(dbURL)
        app.listen(3000)
    } catch (error) {
        console.log(error)
    }
}