import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { useGoogleLogin } from '@react-oauth/google'
import AuthService from '../../../services/auth.service'
type Props={
    savePlatform:(val:any)=>void;
    message:any;
    setMessage:(val:any)=>void;
}
const GoogleButton: React.FC<Props>=({savePlatform, message, setMessage }) => {  
    const loginWithGoogle = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/business.manage",               
        onSuccess: (codeResponse) => {
            googleCallback(codeResponse);
        },        
        onError: (error) => console.log('Login Failed:', error)
    });

    const googleCallback = async (data:any)=>{         
        await AuthService.signInWithGoogle( data ).then((response:any)=>{             
            if(response.status===200){
                if(response?.data?.googlePlacesId){
                    let payload = {
                        googlePlaceId: response.data.googlePlacesId
                    }                    
                    savePlatform(payload);                    
                }else{
                    setMessage("Business is not registered with google account.");
                    return;
                }                
            }else{
                setMessage("Google account is not verified, please try again.");
            }
        },error=>{
            console.log(error);
        })
    };   
    return( <>       
        <button type="button" className={`${dstyles.btn} ${dstyles.other_login}`} aria-label="review-btn" onClick={() => loginWithGoogle()}>
            <img src="/dashboard/icons/google.svg" alt="google" className="me-2" />
            <span className="text fw-bold">Sign In with Google My Business</span> 
        </button>
        {message && <p className={`text-center text-danger fw-md mt-2`}>{message}</p>}
    </>);
}
export default GoogleButton;