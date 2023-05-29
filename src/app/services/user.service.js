import axios from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/', // Replace with your API base URL
});


// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
        const accessToken = JSON.parse(localStorage.getItem("token"));

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;

// export const testAPI = () => {
//     const url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
//     const response =  axios.get(url);
//     return response?.data
// }

// function register(user) {
//     var finalData = {};
//     formData.forEach(function(value, key){
//       finalData[key] = value;
//     });   
//     return axios.post(
//       BASE_API+url, 
//       finalData,
//     ).then(response => {  
//       return response;
//     }).catch(error => {    
//       return error.response; 
//     });
    
// }
// function login(username, password) {
//     return axios
//       .post(BASE_API+endUrl, {
//         'email':email,
//         'password':password,
//       })
//       .then(response => {        
//         if (response.data.token) {           
//           localStorage.setItem("user", JSON.stringify(response.data));         
//         }
//         return response;
//     });
// }