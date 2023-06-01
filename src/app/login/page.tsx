'use client';
import Image from 'next/image'
import styles from '../styles/styles.module.scss'
import LoginForm from '../form-components/login';
import VerifyCodeForm from '../form-components/verify-user';
import SocialMideiaLogin from '../form-components/login-buttons'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service'
import { useAuth } from '../middleware/middleware'
export default function Login() {
  useAuth();

  const [isOTPShow, setIsOTPShow]=useState(false);
  const [isShowForm, setIsShowForm]=useState(false);
  const [userName, setUserName] = useState("");
  const [otp , setOTP] = useState("");
  const [message, setMessage]=useState("");
  const [formHeading, setFormHeading]= useState('Welcome back!');
  const [formSubTitle, setFormSubTitle]=useState('Your Job is About to Get a Whole Lot Smoother with Text');
  const [imageProps, setImageProps] = useState({ 
    imageOne: 'google.png', altTextOne:'google',
    imageTwo:'apple.png', altTextTwo:'apple', 
    imageThree:'arrow-indicate.png', altTextThree:'arrow-indicate',
    connectClass:styles.indicate, height:'27.875rem'
   });
  const getCode = async () => {
    const API_URL = "register";
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
  useEffect(()=>{
    if(isShowForm===true){
      setFormSubTitle('Continue With Email or Phone Number');
      setImageProps({
        imageOne: 'email.png', altTextOne:'email',
        imageTwo:'phone-number.png', altTextTwo:'phone-number', 
        imageThree:'arrow-indicate1.png', altTextThree:'arrow-indicate1',
        connectClass:styles.indicate_one, height:'29rem'
      });
    }
  },[isShowForm]);

  useEffect(()=>{
    if(isOTPShow){
      setFormHeading('Headed your way');
      setFormSubTitle('Start Your Journey with Us');
      setImageProps({
        imageOne: 'your-code.png', altTextOne:'your-code',
        imageTwo:'enter-otp.png', altTextTwo:'enter-otp', 
        imageThree:'arrow-indicate2.png', altTextThree:'arrow-indicate2',
        connectClass:styles.indicate_two, height:'27.188rem'
      });
    }
  },[isOTPShow])

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
              <div className={styles.box_image_wrap} style={{height: `${imageProps.height}` }}>
                <div className='position-relative h-100 w-100'>
                  <img
                    src={`/images/${imageProps.imageOne}`}
                    alt={`${imageProps.altTextOne}`}
                    className={styles.img_one}                
                  />
                  <img
                    src={`/images/${imageProps.imageTwo}`}
                    alt={`${imageProps.altTextTwo}`}
                    className={styles.img_two}                
                  />
                  
                </div>
                <img
                  src={`/images/${imageProps.imageThree}`}
                  alt={`${imageProps.altTextThree}`}
                  className={`${styles.connect_arrow} ${imageProps.connectClass}`}              
                />
              </div>
              <div className='d-flex align-items-end justify-content-start'>
                <img className={styles.bottom_left_circle} src='/images/Shape-left.png' alt="Shape-left" />
                <div className={styles.copyright}>© 2023 Polygogo. All rights reserved.</div>
              </div>
             
            </div>
            <div className={styles.box_two}>
                {/* <img src="/images/Shape-right.png" alt="Shape-right" className={styles.top_right_circle} /> */}
                {/* <div className={`text-center ${styles.heading_wrap}`}>
                  <h1 className={styles.heading_one}>Your job is about to get a whole lot smoother with text</h1>
                </div> */}
                <div className={`${styles.form_wrap} ${styles.after_before_dots}`}> 
                  <div className='text-center w-100'>
                    <h1 className={`text-center ${styles.heading_one} ${styles.text_primary}`}>{formHeading}</h1> 
                    <p className={styles.sub_title}>{formSubTitle}</p>
                    {!isShowForm?(<>
                      <div className='mt-4'></div>
                      <SocialMideiaLogin />
                      <p className='text-center mt-2 mb-3'>Continue With <span className='fw-bold'>Email</span> or <span className='fw-bold'>Phone Number</span></p>
                      <button type='submit' className={`mt-3 ${styles.btn} ${styles.btn_primary}`} onClick={()=>setIsShowForm(true)}>
                        <span className='fw-bold'>Continue</span>
                        <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
                      </button>
                    </>):(<>
                      {isOTPShow!==true?(<> 
                        <LoginForm userName={userName} setUserName={setUserName} loginUser={getCode} />
                        <SocialMideiaLogin />
                      </>):(<>                                        
                        <VerifyCodeForm otp={otp} setOTP={setOTP} submitCode={verifyCode} />                  
                      </>)}
                      {message!==null && <p className='text-center mt-2'>{message}</p>}
                    </>)} 
                  </div>
                </div>
                                
            </div>
          </div>
        </div>
    </main>
  )
}