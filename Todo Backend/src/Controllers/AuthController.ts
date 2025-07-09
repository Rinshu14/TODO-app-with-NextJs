import { Request, Response } from "express";
import { Express } from "express";
import User from "../Models/userModel"
import APIResponse from "../lib/BaseClasses.ts/APIResponse";
import APIError from "../lib/BaseClasses.ts/APIError"
import Mailer from "../lib/utilities/Mailer/mailer";
import { verifyJwtToken } from "../lib/Helper/helperMethods";
import bcrypt from "bcrypt"
import { toUserDTO } from "../lib/Helper/UserDTOMapper";

class AuthController {
    private mailer: Mailer;
    constructor() {
        this.mailer = new Mailer();
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email: email })
            if (!user) throw (new APIError("user does not exist"))
            let isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) throw new APIError("Invalid credentilas")
            if (!user.isVerified) {
                let verificationToken = user.getJwtToken({ id: user._id.toString() });
                await User.findByIdAndUpdate(user._id.toString(), { verificationToken: verificationToken })
                this.mailer.sendEmail(verificationToken, user.email)
                throw new APIError("user is not verified please verifiy ypur user by the link send to your email")
            }
            let token = user.getJwtToken({ id: user._id.toString() })
            let responseData = toUserDTO(user)
            res.cookie('token', token, { httpOnly: true }).json(new APIResponse("user successfully loggedIn", responseData))


        }
        catch (ex) {
            if (ex instanceof APIError) {
                res.status(ex.statusCode || 400).json(ex);
            }
            else if (ex instanceof Error) {
                console.log(ex.message)
                console.log(ex.name)
            }
            else res.json(new APIError("something went wrong"))
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            //validate user data also before we will check later
            let data = req.body;
            let isUserExist = await User.findOne({ email: data.email })
            if (isUserExist) throw new APIError("User already exist with given eamil")
            data.password = await bcrypt.hash(data.password, 10)
            let newUser = new User({ ...data, isVerified: false });
            let createdUser = await newUser.save()
            let verificationToken = newUser.getJwtToken({ id: createdUser._id.toString() });
            await User.findByIdAndUpdate(createdUser._id.toString(), { verificationToken: verificationToken })
            res.json(new APIResponse("user created sucessfully, A mail is sent to mail Id for verification", {}, 201))
            this.mailer.sendEmail(verificationToken, createdUser.email)
        }
        catch (ex) {
            if (ex instanceof APIError) {
                res.status(ex.statusCode || 400).json(ex);
            }
            else if (ex instanceof Error) {
                console.log(ex.message)
                console.log(ex.name)
            }
            else res.json(new APIError("something went wrong"))
        }
    }

    verifyEmail = async (req: Request, res: Response) => {
        try {
            let token = req.query.token as string
            let payload = verifyJwtToken(token)
            let user = await User.findById(payload.id)
            if (token === user?.verificationToken) {
                await User.findByIdAndUpdate({ _id: payload.id }, { isVerified: true })
            }
            else {
                throw new Error();
            }
            res.send("User verified successfully. You can login now")

        }
        catch (ex) {
            if (ex instanceof Error) {
                if (ex.message == "invalid signature") res.json(new APIError("Something went wrong while verifying email"))
                console.log(ex.message)
                console.log(ex.name)
            }
        }
    }
    logout = (req: Express.Request, res: Response) => {

        try {
            res.cookie("token", "", { maxAge: 0, httpOnly: true })
            res.setHeader('clear-site-data', '"cache", "cookies" , "storage"')
            res.json(new APIResponse("You are logged out successfully", {}))
        }
        catch (ex) {
            if (ex instanceof Error) {
                if (ex.message == "invalid signature") res.json(new APIError("Something went wrong while verifying email"))
                console.log(ex.message)
                console.log(ex.name)
            }
        }

    }
}

export default AuthController;