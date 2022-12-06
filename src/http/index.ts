import axios from "axios";


export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// add token to headers
const authInterceptors = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptors)



