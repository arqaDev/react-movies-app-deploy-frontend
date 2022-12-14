import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'
import { useContext } from 'react'
import { Context } from "../index";



// create user and add token to localstorage
export const registration = async (email: string, password: string): Promise<any> => {
    const { data } = await $host.post('api/user/registration', {email, password})
    
    return jwt_decode(data.token)
}

// make login and add token to localstorage
export const login = async (email: string, password: string): Promise<any> => {
    const { data } = await $host.post('api/user/login', {email, password})

    return jwt_decode(data.token)
}

// get data and add token to localstorage
export const check = async (): Promise<any> => {
    const { data } = await $authHost.get('api/user/auth')
    
    return jwt_decode(data.token)
}