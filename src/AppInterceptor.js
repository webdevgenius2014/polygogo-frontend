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
    let contentType='application/json'
    if(request.hasOwnProperty('content-type')) {        
        contentType= 'multipart/form-data';
    }
    request.headers = {
        'Access-Control-Allow-Origin': '*',
        //Authorization: `Bearer ${token}`,        
        'x-access-token': `Bearer ${token}`,
        'Content-Type': contentType,
        Accept: '*/*',
    } 
    return request;
}
const errorHandler = async error => {
    const originalConfig = error.config; 
    throw error.response    
}

export default instance;