
import styles from '../styles/styles.module.scss'
import Image from 'next/image'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './google-login'
import AppleLoginButton from './apple-login';

const SocialMideiaLogin: React.FC=()=> {
  const clientId= process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return(
    <>
      {clientId && <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLoginButton />
      </GoogleOAuthProvider>
      </>}
      <AppleLoginButton /> 
  </>);
}
export default SocialMideiaLogin;