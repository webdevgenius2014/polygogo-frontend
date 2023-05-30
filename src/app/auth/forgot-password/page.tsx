'use client';
import Image from 'next/image'
import styles from '../../styles/styles.module.scss'
// import ForgotPasswordForm from './forgot-password'
import ForgotPasswordForm from '../../form-components/forgot-password'
import VerifyCodeForm from '../../form-components/verify-user';
import SocialMideiaLogin from '../../form-components/login-buttons'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
export default function ForgotPassword() {
  // const [isShowPass, setIsShowPass] = useState(false);  
  const [isOTPShow, setIsOTPShow]=useState(false);
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
                <h2 className={`text-center mb-2 ${styles.heading_one}`}>{!isOTPShow?'Let’s get you signed in. 😀':'Headed your way... 😄'}</h2>
                <p className={`text-center ${styles.fs_sm} `} style={{marginBottom: '3.5rem'}}>Enter the email or mobile number associated with your Polygogo account and we’ll send you a temporary access code.</p>
                {isOTPShow?<VerifyCodeForm />:<ForgotPasswordForm setIsOTPShow={setIsOTPShow} />}
                
                
                <div className='mt-4'></div>
                <SocialMideiaLogin />
                <p className='text-center mt-2'>Don't have an account ? <Link href="/auth/register" className={styles.link}>SIGN UP</Link></p>
              </div>
              <div className={styles.copyright}>© 2023 Polygogo. All rights reserved.</div>
            </div>
            <div className={styles.box_two} style={{backgroundImage:'url(/images/pattern.png)'}}>
                <div className={`text-center ${styles.heading_wrap}`}>
                  <h1 className={styles.heading_one}>Start Your Journey with Us</h1>
                </div>
                {!isOTPShow?(
                    <Image
                        src="/images/change-pwd-code.png"
                        width={570}
                        height={423}
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