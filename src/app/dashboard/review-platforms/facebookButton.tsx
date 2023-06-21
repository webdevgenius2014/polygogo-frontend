import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import FacebookLogin from '@greatsumini/react-facebook-login';
import AuthService from '../../../services/auth.service'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
type Props={
    savePlatform:(val:any)=>void;
    message:any;
    setMessage:(val:any)=>void;
}
const FacebookButton: React.FC<Props>=({savePlatform, message, setMessage}) => { 
    const appId=process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const router = useRouter();

    const facebookCallback = async (data:any)=>{         
        await AuthService.getFacebookPageId( data ).then((response:any)=>{ 
            console.log("login to facebook with token") ;  
            if(response.status===200){ 
                console.log(response);
                if(response.data.facebookPageId){
                    let payload = {
                        facebookPageId: response.data.id
                    }                    
                    savePlatform(payload);                    
                }else{
                    setMessage("facebook page id not found.");
                    return;
                }                
            }else{
                setMessage("Authentication failed please try again");
            }
        },error=>{
            console.log(error);
        })
    };
    return( <>
        {appId && (<>
            <FacebookLogin
                appId={appId}
                onSuccess={(response) => {                   
                    facebookCallback(response);
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