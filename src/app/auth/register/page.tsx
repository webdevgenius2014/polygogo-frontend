'use client';
import Image from 'next/image'
import styles from '../../styles/styles.module.scss'
import SocialMideiaLogin from '../../form-components/login-buttons'
import LoginRegisterForm from '../../form-components/login-resister';
import VerifyCodeForm from '../../form-components/verify-user';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
// import {testAPI} from '../../services/user.service';
import axiosInstance from '../../services/user.service';

export default function Register() {
  const [isFromShow, setIsFromShow]= useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isOTPShow, setIsOTPShow]=useState(false);
  const [currentImage, setCurrentImage]= useState("social-media-login");
  useEffect(()=>{
    const getData = async () => {
      try {
        const response = await axiosInstance.get('bulbasaur'); // Replace with your API endpoint  
        // Handle the response data here
        console.log(response.data);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    }; 
    // getData();   
  }, []); 
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
                {isOTPShow?(<>
                  <h2 className={`text-center mb-3 ${styles.heading_one}`}>'Headed your way... 😄</h2>   
                  {isFromShow?(<>
                    <VerifyCodeForm />
                    <div className='text-center' style={{marginTop: '5.8rem'}}><Link href="/auth/register" className={styles.link}>Need more help?</Link></div>
                  </>):<div style={{marginTop: '4.584rem'}}></div>}
                  
                </>):(<>
                  <h2 className={`text-center mb-3 ${styles.heading_one}`}>Give company a try. It"’"s free.</h2> 
                  <p className={`text-center ${styles.fs_sm} ${styles.mw_356}`} style={{marginBottom: '2.938rem'}}>Grow with tools for texting customers, getting reviews, and making sales. No credit card required.</p>
                  <SocialMideiaLogin />
                  {isFromShow?(
                    <LoginRegisterForm isShowPass={isShowPass} setIsShowPass={setIsShowPass} setIsOTPShow={setIsOTPShow} />
                  ):<div style={{marginTop: '4.584rem'}}></div>}
                                
                  <p className='text-center mb-0'>You can also continue with <span className={styles.link} onClick={()=>setIsFromShow(true)}>Email</span></p>
                  <p className={`text-center ${styles.fs_sm} ${styles.mw_356} ${styles.mtb_4}`}>By continuing, you agree that you have read and accept Polygogo <Link href="/" className={`${styles.link}`}>Terms of Service </Link> and <Link href="/" className={`${styles.link}`}>Privacy Policy.</Link></p>
                  <p className='text-center'>Already have an account? <Link href="/auth/login" className={`text-uppercase ${styles.link}`}>Sign In</Link></p>
                </>)}
              </div>
              <div className={styles.copyright}>© 2023 Polygogo. All rights reserved.</div>
            </div>
            <div className={styles.box_two} style={{backgroundImage:'url(/images/pattern.png)'}}>
                <div className={`text-center ${styles.heading_wrap}`}>
                  <h1 className={styles.heading_one}>Join 100,000+ businesses using Polygogo to grow</h1>
                </div>
                {!isFromShow && !isShowPass && !isOTPShow?(
                  <Image
                    src="/images/social-media-login.png"
                    width={579}
                    height={459}
                    alt="email login"
                    className='mw-100'
                  />
                ):isFromShow && isShowPass && !isOTPShow?(
                  <Image
                    src="/images/password-lock.png"
                    width={512}
                    height={369}
                    alt="email login"
                    className='mw-100'
                  />
                ):isFromShow && !isShowPass && !isOTPShow?(
                  <Image
                    src="/images/email-login.png"
                    width={582}
                    height={479}
                    alt="password lock"
                    className='mw-100'
                  />
                ):
                isFromShow && isShowPass && isOTPShow?(
                  <Image
                    src="/images/enter-code.png"
                    width={427}
                    height={238}
                    alt="change-pwd-code"
                    className='mw-100'
                  />
                ):('')}                
            </div>
          </div>
        </div>
    </main>
  )
}