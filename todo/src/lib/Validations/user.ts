import { z } from "zod/v4";
import isMobilePhone from "validator/lib/isMobilePhone"
import isEmail from "validator/lib/isEmail"
import isAlpha from "validator/lib/isAlpha"
import isStrongPassword from "validator/lib/isStrongPassword";

export const userschema = z.object({
    name: z.string().refine((data) => isAlpha(data), { error: "First Name can have only alphabets" }),
    // lastName: z.string().refine((data) => isAlpha(data), { error: "Last Name can have only alphabets" }),
    email: z.string().refine((data) => isEmail(data), { error: "Enter valid emailId" }),
    phoneNumber: z.string().refine((data) => isMobilePhone(data, "es-MX"), { error: "Enter valid mobile number" }),
    password: z.string().refine((data) => isStrongPassword(data, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }), { error: "Enter valid password" })
})

export type user= z.infer<typeof userschema>

export const userLoginSchema = z.object({
   
    email: z.string().refine((data) => isEmail(data), { error: "Enter valid emailId" }),
   
    password: z.string().refine((data) => isStrongPassword(data, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }), { error: "Enter valid password" })
})
export type userLogin = z.infer<typeof userLoginSchema>