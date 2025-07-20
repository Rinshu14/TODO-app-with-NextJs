import { model, Schema ,Types} from "mongoose";
import isMobilePhone from "validator/lib/isMobilePhone"
import isEmail from "validator/lib/isEmail"
import isAlpha from "validator/lib/isAlpha"
import isStrongPassword from "validator/lib/isStrongPassword";
import jwt from "jsonwebtoken"
import { themeEnum } from "../lib/enums";
import { User } from "../types/User"



export interface IUserModel extends Document {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    theme: themeEnum
    isVerified: Boolean
    verificationToken: String
    RefreshToken: String
    getJwtToken(data: Partial<User>): string
    verifyJwtToken(token:string): boolean
}

const userSchema = new Schema<IUserModel>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10,
        validate: (data: string) => { return isAlpha(data); }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
        validate: (data: string) => { return isEmail(data); }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: (data: string) => { return isStrongPassword(data); }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: (data: string) => { return isMobilePhone(data); }
    },
    theme: {
        required: true,
        type: String,
        default: themeEnum.light
    },
    isVerified: Boolean,
    verificationToken: String,
    RefreshToken: String
}, { timestamps: true }
)

userSchema.index({ email: 1 })

userSchema.methods.getJwtToken = function (data: Partial<User>) {
    if (process.env.JWTTOKENKEY) {
        return jwt.sign(data, process.env.JWTTOKENKEY,{expiresIn:15*60*1000})
    }
    else {
        throw new Error("Not found databse connection string")
    }
}
userSchema.pre('save', function () {
    this.email = this.email.toLowerCase();
})
const User = model<IUserModel>("User", userSchema)

export default User

