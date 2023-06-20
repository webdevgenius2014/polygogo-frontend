import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { useGoogleLogin } from '@react-oauth/google'
import AuthService from '../../../services/auth.service'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
type Props={
    savePlatform:(val:any)=>void;
    message:any;
    setMessage:(val:any)=>void;
}
const GoogleButton: React.FC<Props>=({savePlatform, message, setMessage }) => {  
    const router = useRouter();    
    const loginWithGoogle = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/business.manage",               
        onSuccess: (codeResponse) => {
            googleCallback(codeResponse);
        },        
        onError: (error) => console.log('Login Failed:', error)
    });

    const googleCallback = async (data:any)=>{         
        await AuthService.signInWithGoogle( data ).then((response:any)=>{ 
            console.log("login to google with token") ;  
            if(response.status===200){ 
                console.log(response);
                if(response.data.googlePlacesId){
                    let payload = {
                        googlePlaceId: response.data.googlePlacesId
                    }                    
                    savePlatform(payload);                    
                }else{
                    setMessage("business is not registered with google id");
                    return;
                }                
            }else{
                setMessage("email verification failed");
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