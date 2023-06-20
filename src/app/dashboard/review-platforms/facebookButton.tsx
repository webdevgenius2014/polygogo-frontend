import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const FacebookButton=() => { 
    const appId=process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const router = useRouter();
    const [message, setMessage]=useState("");
    const loginWithFacebook=()=>{
        console.log('login with facebook')
    }
    const onFacebookFail=(error:any)=>{
        console.log('Login Failed!', error);
    }
    const onFacebookloginSuccess=(response:any)=>{
        console.log('Login Success!', response);
    }
    const onFacebookProfileSuccess=(response:any)=>{
        console.log('Get Profile Success!', response);
    }
    return( <>
        {appId && (<>
            <FacebookLogin
                appId={appId}
                onSuccess={(response) => {
                    console.log('Login Success!', response);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                }}
                className={`${dstyles.btn} ${dstyles.other_login}`}
            >
                <img src="/dashboard/icons/faceboook.svg" alt="faceboook" className="me-2" />
                <span className="text fw-bold">Sign In with Facebook My Business</span> 
            </FacebookLogin> 
            {message && <p className={`text-center fw-md mt-2`}>{message}</p>}
        </>)}
    </>);
}
export default FacebookButton;