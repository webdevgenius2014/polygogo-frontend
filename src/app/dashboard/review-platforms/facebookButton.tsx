import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import AuthService from '../../../services/auth.service'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const FacebookButton=() => {  
    const router = useRouter();
    const [message, setMessage]=useState("");
    const loginWithFacebook=()=>{
        console.log('login with facebook')
    }
    return( <>        
        <button type="button" className={`${dstyles.btn} ${dstyles.other_login}`} aria-label="review-btn" onClick={() => loginWithFacebook()}>
            <img src="/dashboard/icons/faceboook.svg" alt="faceboook" className="me-2" />
            <span className="text fw-bold">Sign In with Facebook My Business</span> 
        </button>                          
                
        {message && <p className={`text-center fw-md mt-2`}>{message}</p>}
    </>);
}
export default FacebookButton;