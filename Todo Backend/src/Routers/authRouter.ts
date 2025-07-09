import { Router, Request, Response } from "express";
import AuthController from "../Controllers/AuthController";
import isUserLoggedIn from "../Middleware/AuthMiddleware"

class AuthRouter {

    router;
    authController: AuthController;

    constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.routes();
    }

    private routes() {
         this.router.post("/login", this.authController.login)
        // this.router.post("/login",(req,res)=>{
        //     console.log("in login")
        // })
        this.router.post("/signup", this.authController.signUp)
        this.router.get("/verifyemail",this.authController.verifyEmail)
        this.router.post("/logout",isUserLoggedIn,this.authController.logout)

    }


}

export default new AuthRouter().router;