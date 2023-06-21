import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import FacebookLogin from '@greatsumini/react-facebook-login';
import AuthService from '../../../services/auth.service'
type Props={
    savePlatform:(val:any)=>void;
    message:any;
    setMessage:(val:any)=>void;
}
const FacebookButton: React.FC<Props>=({savePlatform, message, setMessage}) => { 
    const appId=process.env.NEXT_PUBLIC_FACEBOOK_APP_ID; 
    const saveFacebookPageId=(response:any)=>{
        if(response.id){
            let payload = {
                facebookPageId: response.id
            }                    
            savePlatform(payload);                  
        }else{
            setMessage("facebook page id not found.");
            return;
        } 
    }
    return( <>
        {appId && (<>
            <FacebookLogin
                appId={appId}
                onSuccess={(response) => {   
                    console.log('Login Success', response); 
                    AuthService.getFacebookPageId(response);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                    saveFacebookPageId(response);
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