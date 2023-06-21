import styles from '../../styles/styles.module.scss'
import Image from 'next/image'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import AuthService from '../../services/auth.service'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const GoogleLoginButton=() => {  
    const router = useRouter();
    const [message, setMessage]=useState("");
    const loginWithGoogle = useGoogleLogin({        
        onSuccess: (codeResponse) => {                      
            googleCallback(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const googleCallback = async (data:any)=>{ 
        await AuthService.signInWithGoogle( data ).then((response)=>{      
            if(response.status===200){                 
                var data={
                    "type" : "google",
                    "name" : response.data.name,
                    "email" : response.data.email
                }
                loginWithGoogleCallback(data);
            }else{
                setMessage("email verification failed");
            }
        },error=>{
            console.log(error);
        })
    };
    const loginWithGoogleCallback = async (data:any)=>{ 
        await AuthService.socialLogin(data).then((response)=>{      
            if(response){
                if(response?.data?.token){
                    sessionStorage.setItem("auth_token", response.data.token);                    
                    router.push('/dashboard/profile');
                }
                else{
                    setMessage("Some error occurred. Please try again later");
                }
            }
        },error=>{
            console.log(error);
        })
    };
    return( <>
        <button onClick={() => loginWithGoogle()} type='button' className={`d-block ms-auto me-auto ${styles.btn} ${styles.other_login}`}>
            <Image
                src="/google.svg"
                width={20}
                height={21}
                alt="google"                
            />
            <span className='ms-3'>Login with Google</span>
        </button> 
        {message && <p className={`text-center fw-md mt-2`}>{message}</p>}
    </>);
}
export default GoogleLoginButton;