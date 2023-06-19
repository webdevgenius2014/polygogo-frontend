import instance from '../AppInterceptor'
import ApiConfig from '../config/apiConfig';
class ProfileService {  
    getCurrentUser(){        
        return instance.post(ApiConfig.userDetails)  
    }
    getOtp(payload) {  
        return instance.post(ApiConfig.sendOtp, payload)    
    }
    VerifyOtp(payload) {  
        return instance.post(ApiConfig.verifyOtp, payload)    
    }
    completeProfile(payload) { 
        return instance.post(ApiConfig.completeProfile, payload); 
    }
    uploadProfileImage(payload) {                       
        let headers = {
            'content-type': 'multipart/form-data',
        }
        return instance.post(ApiConfig.completeProfile, payload, headers); 
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
}
export default new ProfileService();