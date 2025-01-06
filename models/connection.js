import mongoose from "mongoose";

const connectionToDB =async()=>{
    try{
        const connectionParams = {
            dbName : process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams,
        );
        console.log(`${chalk.blue.bold(`MongoDB Connected on : ${connect.connection.host}`)}`);
    }catch(error){
        console.error(`${chalk.red.bold(`Error:${error.message}`)}`)
        process.exit(1);
    }
}

export default connectionToDB;