import mongoose from 'mongoose';

const connectDB = async ()=>{
    const dbURI = process.env.dbURI || '';
    console.log('[server]: Connecting to DB...');
    try{
        await mongoose.connect(dbURI);
    }catch(error){
        console.log('[server]: Could not connect to DB');
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;