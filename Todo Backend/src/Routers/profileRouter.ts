import { Router, Request, Response } from "express";
import ProfileController from "../Controllers/ProfileController";
import { upload } from "../lib/utilities/multer";
import isUserLoggedIn from "../Middleware/AuthMiddleware"

class ProfileRouter {

    router;
    profileController: ProfileController;

    constructor() {
        this.router = Router()
        this.profileController = new ProfileController()
        this.routes();
    }

    private routes() {
        // this.router.post("/update", upload.single("profilePhoto"), this.profileController.getProfile)
        this.router.get("/view", isUserLoggedIn, this.profileController.getProfile)


    }


}

export default new ProfileRouter().router;