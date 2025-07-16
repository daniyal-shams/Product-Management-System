#!/usr/bin/env node

import express from 'express' ;
import mongoose from 'mongoose' ;
import cookieParser from 'cookie-parser';
import cors from 'cors' ;
import authRouter from './routes/authRoutes.js' ;


mongoose
    .connect('mongodb+srv://hussaindaniyal306:v4gUqHeQXYSAuRLf@cluster0.hxrkt8c.mongodb.net/ProductManagementSystem?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log("DB Connected"))
    .catch((err)=> console.log(err));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods :  ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))