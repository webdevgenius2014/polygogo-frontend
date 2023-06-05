import axios from "axios";
import instance from '../AppInterceptor'
const apiURl=process.env.NEXT_PUBLIC_API_URL
const BASE_API = apiURl+"/api/";
import ApiConfig from '../config/apiConfig';
class AuthService {  
  getOtp(username){
    let payload = {username:username} 
    return instance.post(ApiConfig.registerLogin, payload)  
  }
  verifyOtp(payload) {  
    return instance.post(ApiConfig.verifyOtp, payload)    
  }
  signInWithGoogle(data){
    return axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        Accept: 'application/json'
      }
    })
    .then((res) => {
      return res;   
    })
    .catch((err) => {
      return err; 
    });
  }  
  socialLogin(payload){    
    return instance.post(ApiConfig.socialLogin, payload)
  }
  logout() {
    sessionStorage.removeItem("auth_token");        
  }
  register(url, formData) { 
    var finalData = {};
    formData.forEach(function(value, key){
      finalData[key] = value;
    });   
    return axios
      .post(
        BASE_API+url, 
        finalData
      )
      .then(response => {    
        if (response.data.token) {           
          localStorage.setItem("user", JSON.stringify(response.data));          
        }
        return response;
    });
  }
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
export default new AuthService();