import { Request, Response, NextFunction } from "express"
import { verifyJwtToken } from "../lib/Helper/helperMethods";
import APIError from "../lib/BaseClasses.ts/APIError";
import User from "../Models/userModel"
import { HttpStatusCodesEnum } from "../lib/enums";
import { toUserApp } from "../lib/Helper/UserDTOMapper";

class AuthMiddleware {

    isUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("in middleware")
            console.log(req.cookies.toString())
            let token =  (req.cookies).token
            console.log(token)
            if (!token) throw new APIError("Invalid Credentials")
            let userId = verifyJwtToken(token).id
            if (userId) {
                let user = await User.findById(userId)
                if (user) {
                    let data = toUserApp(user)
                    req.user = data
                    next();
                }
                else res.json(new APIError("invalid credentials"))
            }
            else {
                res.json(new APIError("invalid credentials"))
            }
        }
        catch (ex) {
            console.log("in catch")
            if (ex instanceof APIError) {
                console.log(ex.message)
                res.status(ex.statusCode || 400).json(ex);
            }
            else res.json(new APIError("something went wrong", HttpStatusCodesEnum.INTERNAL_SERVER_ERROR))
        }
    }
}
export default new AuthMiddleware().isUserLoggedIn;

