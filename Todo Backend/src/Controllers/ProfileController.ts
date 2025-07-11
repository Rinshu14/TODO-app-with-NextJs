import { Request, Response } from "express";
import User from "../Models/userModel"
import APIResponse from "../lib/BaseClasses.ts/APIResponse";
import APIError from "../lib/BaseClasses.ts/APIError"
import { toUserDTO } from "../lib/Helper/UserDTOMapper";

class ProfileController {

    getProfile = async (req: Request, res: Response) => {
       // console.log("in profile controller")
        try {
            let data = await User.findById(req.user?.id)
            if (data) {
                let processedData = toUserDTO(data)
                res.json(new APIResponse("user fetched successfully", processedData))
            }
            else {
                res.json(new APIError("user is not there"))
            }
        }
        catch (ex) {
            if (ex instanceof APIError) {
                res.json(ex)
            }
            else res.json(new APIError("something went wrong"))
        }



    }





}

export default ProfileController;