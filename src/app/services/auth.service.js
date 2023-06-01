import axios from "axios";
const apiURl=process.env.NEXT_PUBLIC_API_URL
const BASE_API = apiURl+"/api/";
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
  // signInWithGoogle(){
  //   return axios({
  //     method: "get",
  //     url: "sandbox7.feedly.com",
  //     client_id: "sandbox",
  //     client_secret: "e4RK9ybUMPAa5PgV",
  //     redirect_uri: "http://localhost:8080"
  //   })
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // }
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