
import { verify } from "jsonwebtoken"

interface customPayload {
    id: string;
}

export const verifyJwtToken = function (token: string) {
    if (process.env.JWTTOKENKEY) {
        return  verify(token, process.env.JWTTOKENKEY) as customPayload
    }
    else {
        throw new Error("Not found databse connection string")
    }
}