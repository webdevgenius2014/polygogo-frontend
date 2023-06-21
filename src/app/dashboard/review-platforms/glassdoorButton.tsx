import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import AuthService from '../../../services/auth.service'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const GlassDoorButton=() => {  
    const router = useRouter();
    const [message, setMessage]=useState("");
    const loginWithGlassDoor=()=>{
        console.log('login with glassdoor')
    }
    return( <>       
        <button type="button" className={`${dstyles.btn} ${dstyles.other_login}`} aria-label="review-btn" onClick={() => loginWithGlassDoor()}>
            <img src="/dashboard/icons/glassdoor.svg" alt="glassdoor" className="me-2" />
            <span className="text fw-bold">Sign In with Glassdoor My Business</span> 
        </button> 
        {message && <p className={`text-center fw-md mt-2`}>{message}</p>}
    </>);
}
export default GlassDoorButton;