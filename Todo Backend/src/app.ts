import express from "express";
import { config as dotEnvConfig } from "dotenv"
import authRouter from "./Routers/authRouter"
import dbConfig from "./lib/DBConfig/dbConfig"
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser"
import profileRouter from "./Routers/profileRouter";
import taskRouter from "./Routers/taskRouter";

class App {

    app;
    constructor() {
        //everything that we want to register whenevr a app runs write 
        // in this consturvtor as it runs as soon as we initialize the instace of app
        this.app = express();
        this.app.use(bodyParser.json())
        this.app.use(cookieParser())
        this.app.use(cors({ origin: "http://localhost:3000", credentials: true }))
        this.routes();
        dotEnvConfig();
        new dbConfig();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("server started")
        })
    }

    routes() {

        this.app.use("/auth", authRouter)
        this.app.use("/profile", profileRouter)
        this.app.use("/task", taskRouter)
        this.app.use("/", (req, res) => {
            console.log("in app route")
            res.send("hey hii from route")
        })
    }

}

export default new App()