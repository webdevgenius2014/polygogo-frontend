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
        // let headers = {
        //   'content-type': 'multipart/form-data',
        // }
      return instance.post(ApiConfig.completeProfile, payload); 
    } 
}
export default new ProfileService();