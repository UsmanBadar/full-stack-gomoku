import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './src/util/connectDB';
import app from './src/app';

dotenv.config();
const port = process.env.PORT;

// Connect to database
connectDB();

mongoose.connection.once('connected', ()=>{
    console.log('[server]: Connected to MongoDB.');
    app.listen(port, ()=>{
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
