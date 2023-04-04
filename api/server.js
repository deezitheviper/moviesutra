import express from 'express';
import cors from 'cors';
import dotenv from dotenv;
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

if(process.env.NODE_ENV === 'dev'){
    app.use(
        cors({
            credentials:true,
            origin: process.env.CLIENT_URL
        })
    )
}

app.listen(8000, () => {
    console.log('Api working on port 8000')
})

