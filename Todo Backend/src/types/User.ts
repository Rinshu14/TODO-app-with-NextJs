import { themeEnum } from "../lib/enums"
//this user will be used for internal app communication
export interface User {
    id?:string
    name: string
    email: string
    password?: string
    phoneNumber: string
    theme:themeEnum
}
