import { useEffect, useState } from "react"
import { Authentication } from "../types/auth"
import { checkLoginStatus } from "../utils/auth"
import { jwtDecode } from "jwt-decode"

export const useAuthentication = () => {
    const [authentication, setAuthentication] = useState<Authentication>({authenticated: false})
    const token = checkLoginStatus();

    useEffect(() => {
        if(token && isValidJwt(token)){
            setAuthentication({authenticated: true, token})
        } else {
            setAuthentication({authenticated: false})
        }
    }, [token])

    return authentication
}

export const isValidJwt = (token: string) => {
    const jwt = jwtDecode(token);
    return jwt.exp && jwt.exp > Date.now() / 1000;
}