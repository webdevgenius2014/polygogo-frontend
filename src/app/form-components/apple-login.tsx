import styles from '../../styles/styles.module.scss'
import Image from 'next/image'
import AuthService from '../../services/auth.service'
import AppleLogin from 'react-apple-login';
import { useRouter } from 'next/navigation';

const AppleLoginButton= () => {
    const router = useRouter();
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URL;

    const appleResponse = async(response:any) => {
        console.log(response)
        if (!response.error) {
            console.log(response)
            let params = {
                "type" : "apple",
                "name" : response?.data?.name,
                "email" : response.data.email
            }
            await AuthService.socialLogin(params).then((data)=>{      
                if(data){
                    console.log("get token for verified emil from backend api");  
                    console.log(data);
                    sessionStorage.setItem("auth_token", data.data.token);
                    setTimeout(() => {
                        router.push('/');
                    }, 3000); 
                }
            })
        }
    }

    return( 
        <AppleLogin
        clientId={clientId}
        redirectURI={redirectUrl}
        usePopup={true}
        callback={appleResponse} // Catch the response
        scope="email name"
        responseMode="query"
        render={renderProps => ( 
            <button type='button' className={`d-block ms-auto me-auto ${styles.btn} ${styles.other_login}`}>
                <Image
                src="/apple.svg"
                width={20}
                height={24}
                alt="apple"                
                />           
                <span className='ms-3'>Login With Apple</span>
            </button>
        )}
        />
    );
}
export default AppleLoginButton;