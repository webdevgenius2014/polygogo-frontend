import styles from '../../styles/styles.module.scss'
import Image from 'next/image'
import AuthService from '../../services/auth.service'
import { ButtonApple } from '@nixjs23n6/next-apple-login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AppleLoginButton= () => {
    const router = useRouter();
    const [message, setMessage]=useState("");
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URL;
    const responseApple = async (response:any) => {
        console.log(response, response.authorization?.id_token)
        if(!response.error)
        {
            let params = {
                "type" : "apple",
                "id_token" : response.authorization?.id_token
            }
            await AuthService.socialLogin(params).then((response)=>{      
                if(response?.data?.token){
                    sessionStorage.setItem("auth_token", response.data.token);
                    router.push('/');
                }
                else{
                    setMessage("Some error occurred. Please try again later");
                }
            })
        }
    }

    return( 
        <>
            <ButtonApple
                clientId={clientId}
                redirectURI={redirectUrl}
                responseType="id_token"
                responseMode="query"
                callback={responseApple}
                className={`d-block ms-auto me-auto ${styles.btn} ${styles.other_login}`}
            >
                <>
                    <Image
                    src="/apple.svg"
                    width={20}
                    height={24}
                    alt="apple"                
                    />           
                    <span className='ms-3'>Login With Apple</span>
                </>
            </ButtonApple>
            {message && <p className={`text-center fw-md mt-2`}>{message}</p>}
        </>
    );
}
export default AppleLoginButton;