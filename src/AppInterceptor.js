import axios from "axios";
const instance = axios.create({});

instance.interceptors.request.use(request => requestHandler(request));
instance.interceptors.response.use(
    response => {
        return response
    },
    (error)=> errorHandler(error),
);

const requestHandler = async request => {
    let token = sessionStorage.getItem("auth_token")
    request.headers = {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*',
    }
    return request;
}

const errorHandler = async error => {
    const originalConfig = error.config;
    throw error.response
}

export default instance;