import axios from "axios";
const apiURl=process.env.NEXT_PUBLIC_API_URL
const BASE_API = apiURl+"/api/";
import ApiConfig from '../config/apiConfig';
class AuthService {  
  getOtp(username){    
    return axios.post(ApiConfig.registerLogin, {
        'username':username,
      }).then(response => {
        return response;
      },error=>{
        return error;
      }
    )
  }
  verifyOtp(username, otp) {   
    return axios
      .post(ApiConfig.verifyOtp, {
        'username':username,
        'otp':otp,
      })
      .then(response => { 
        // if(response.status===200){
        //   sessionStorage.setItem("auth_token", response.data.token);
        // }        
        return response;
      }
    );
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
    return axios.post(ApiConfig.socialLogin, payload)
                .then(response => {
                return response;
              },error=>{
                return error;
              })
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
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();