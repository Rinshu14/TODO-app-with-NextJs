import mongoose, { mongo, Mongoose } from "mongoose";

class DBConnection {
    
    constructor() {
        connectDb()
    }
}

async function connectDb() {

    try {
        mongoose.connection.on("connecting", () => {
            console.log("Database connecting")
        })
        mongoose.connection.on("connected", () => {
            console.log("Database connected")
        })
        mongoose.connection.on("error", () => {
            console.log("Error while database connection")
        })
        if (process.env.CONNECTIONSTRING) {

            let res = await mongoose.connect(process.env.CONNECTIONSTRING)

        }
        else {
            throw new Error("Not found databse connection string")
        }
    }
    catch (ex) {
        console.log(ex)
        // console.log("not able to connect data closing app")
        process.exit(1)
    }
}

export default DBConnection