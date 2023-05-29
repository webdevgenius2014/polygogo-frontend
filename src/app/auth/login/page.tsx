'use client';
import Image from 'next/image'
import styles from '../../styles/styles.module.scss'
import LoginRegisterForm from '../../form-components/login-resister';
import SocialMideiaLogin from '../../form-components/login-buttons'
import Link from 'next/link';
import { useState } from 'react';
export default function Login() {
  const [isShowPass, setIsShowPass] = useState(false);  
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
                {isShowPass!==true?(
                  <h2 className={`text-center ${styles.heading_one}`}>Welcome back!</h2>
                ):''}  
                <LoginRegisterForm isShowPass={isShowPass} setIsShowPass={setIsShowPass} /> 
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
                {!isShowPass?(
                    <Image
                        src="/images/email-login.png"
                        width={579}
                        height={482}
                        alt="email login"
                        className='mw-100'
                    />
                ):(
                    <Image
                        src="/images/password-lock.png"
                        width={512}
                        height={369}
                        alt="password lock"
                        className='mw-100'
                    />
                )}                 
            </div>
          </div>
        </div>
    </main>
  )
}