import { IUserModel } from "Models/userModel"
import { UserDTO } from "../../types/UserDTO"
import {User} from "../../types/User"

export const toUserDTO = (user: IUserModel): UserDTO => {
    return {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        theme: user.theme,
        id: user._id.toString(),

    }
}

export const toUserApp = (user: IUserModel): User => {
    return {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        theme: user.theme,
        id: user._id.toString(),

           

    }
}


