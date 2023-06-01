'use client';
import Image from 'next/image'
import styles from '../styles/styles.module.scss'
import LoginForm from '../form-components/login';
import VerifyCodeForm from '../form-components/verify-user';
import SocialMideiaLogin from '../form-components/login-buttons'
import Link from 'next/link';
import { useState } from 'react';
import AuthService from '../services/auth.service'
import { useAuth } from '../middleware/middleware'
export default function Login() {
  useAuth();

  const [isOTPShow, setIsOTPShow]=useState(false);
  const [userName, setUserName] = useState("");
  const [otp , setOTP] = useState("");
  const [message, setMessage]=useState("");
  const getCode = async () => {
    const API_URL = "register";
    console.log("hello i am here 111");   
    console.log(userName);
    await AuthService.getOTP( API_URL, userName ).then((response)=>{
      console.log(response);
      if(response.status===201){
        setIsOTPShow(true);
        setMessage(response.data.message)
      }else{
        setMessage(response.error)
      }
      
    },error=>{      
      setMessage(error.error)
    })
  };
  const verifyCode = async ()=>{
    const API_URL = "verify-email";    
    await AuthService.login( API_URL, userName, otp ).then((response)=>{
      if(response.status===200){
        setMessage(response.data.message);
        sessionStorage.setItem("auth_token", response.data.token);
      }
    },error=>{
      console.log(error);
    })
  };
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <div className={`d-flex ${styles.box_wrap}`}>
            <div className={styles.box_one}>
              <div className={styles.title_image}>
                <Image
                  src="/PolygogoBlack.png"
                  width={176}
                  height={35}
                  alt="Poly go go Black"                
                />
              </div>
              
              <div className={styles.form_wrap}>                
                {isOTPShow!==true?(<>
                  <h2 className={`text-center ${styles.heading_one}`}>Welcome back!</h2>
                  <LoginForm userName={userName} setUserName={setUserName} loginUser={getCode} />
                </>):(<>
                  <h2 className={`text-center ${styles.heading_one}`}>Enter Code</h2>
                  <VerifyCodeForm otp={otp} setOTP={setOTP} submitCode={verifyCode} />                  
                </>)}
                {message!==null && <p className='text-center mt-2'>{message}</p>}
                <div className='mt-4'></div>
                <SocialMideiaLogin />
                <p className='text-center mt-2'>Don't have an account ? <Link href="/auth/register" className={styles.link}>SIGN UP</Link></p>
              </div>
              <div className={styles.copyright}>© 2023 Polygogo. All rights reserved.</div>
            </div>
            <div className={styles.box_two} style={{backgroundImage:'url(/images/pattern.png)'}}>
                <div className={`text-center ${styles.heading_wrap}`}>
                  <h1 className={styles.heading_one}>Your job is about to get a whole lot smoother with text</h1>
                </div>
                {!isOTPShow?(
                  <Image
                    src="/images/email-login.png"
                    width={579}
                    height={482}
                    alt="email login"
                    className='mw-100'
                  />
                ):(
                  <Image
                    src="/images/enter-code.png"
                    width={427}
                    height={238}
                    alt="enter-code"
                    className='mw-100'
                  />
                )}                 
            </div>
          </div>
        </div>
    </main>
  )
}