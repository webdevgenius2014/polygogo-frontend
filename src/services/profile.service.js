import instance from '../AppInterceptor'
import ApiConfig from '../config/apiConfig';
class ProfileService {  
    getCurrentUser(){        
        return instance.post(ApiConfig.userDetails)  
    }
    completeProfile(payload) {  
        return instance.post(ApiConfig.completeProfile, payload)    
    }
}
export default new ProfileService();