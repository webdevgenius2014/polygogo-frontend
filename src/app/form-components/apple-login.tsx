import styles from '../../styles/styles.module.scss'
import Image from 'next/image'
import AuthService from '../../services/auth.service'
import { ButtonApple } from '@nixjs23n6/next-apple-login';
import { useRouter } from 'next/navigation';

const AppleLoginButton= () => {
    const router = useRouter();
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URL;
    const responseApple = (response:any) => {
        console.log(response, response.authorization?.id_token)
    }

    // const appleResponse = async(response:any) => {
    //     console.log(response)
    //     if (!response.error) {
    //         console.log(response)
    //         let params = {
    //             "type" : "apple",
    //             "name" : response?.data?.name,
    //             "email" : response.data.email
    //         }
    //         await AuthService.socialLogin(params).then((data)=>{      
    //             if(data){
    //                 console.log("get token for verified emil from backend api");  
    //                 console.log(data);
    //                 sessionStorage.setItem("auth_token", data.data.token);
    //                 setTimeout(() => {
    //                     router.push('/');
    //                 }, 3000); 
    //             }
    //         })
    //     }
    // }

    return( 
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
    );
}
export default AppleLoginButton;