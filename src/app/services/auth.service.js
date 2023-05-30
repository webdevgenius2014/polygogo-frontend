import axios from "axios";
const apiURl=process.env.NEXT_PUBLIC_API_URL
// const BASE_API = apiURl+"/api/";
const BASE_API = "http://45.79.216.68/api/"
class AuthService {
  getOTP(endUrl, username){    
    return axios.post(BASE_API+endUrl, {
        'email':username,
      }).then(response => {
        return response;
      },error=>{
        return error;
      }
    )
  }
  login(endUrl, email, otp) {    
    return axios
      .post(BASE_API+endUrl, {
        'email':email,
        'otp':otp,
      })
      .then(response => {        
        // if (response.data.token) {           
        //   localStorage.setItem("user", JSON.stringify(response.data));         
        // }
        return response;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("company");      
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