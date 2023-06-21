'use client';
import Image from 'next/image'
import styles from '../../styles/styles.module.scss'
import LoginForm from '../form-components/login'
import VerifyCodeForm from '../form-components/verify-user'
import SocialMideiaLogin from '../form-components/login-buttons'
import { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service'
import { useAuth } from '../middleware/middleware'
import { useRouter } from 'next/navigation';
import { validateEmail, testPhone, validateOTP } from '@/helpers/formatCheck';
type Props = { 
    btnText:string,     
    buttonLabel:string
};
const LoginRegister :React.FC<Props> = ({btnText, buttonLabel}) => {
  const router = useRouter();
  useAuth();
  const [isOTPShow, setIsOTPShow]=useState(false);
  const [isShowForm, setIsShowForm]=useState(false);
  const [userName, setUserName] = useState("");
  const [otp , setOTP] = useState("");
  const [message, setMessage]=useState("");
  const [formHeading, setFormHeading]= useState('Welcome back!');
  const [formSubTitle, setFormSubTitle]=useState('Your Job is About to Get a Whole Lot Smoother with Text');
  const [alertClass, setAlertClass]=useState('');
  const [isResend, setIsResend]=useState(false);  
  const [imageProps, setImgeProps] = useState({ 
    imageOne:{image: 'google.png', altText:"google", height:'18.875rem'},
    imageTwo:{image:'apple.png',altText:'apple', height:'11.938rem'},    
    imageThree:{image:'arrow-indicate.png', altText:'arrow-indicate', height:'11.688rem'},
    connectClass:styles.indicate,
    minwidth:'39.75rem',
    height: '27.875rem'
  });  

  const [imgProps, setImgProps] = useState({ 
    image: 'google-apple.svg', 
    altText:'google-apple', 
    minwidth:'39.75rem',
    height: '27.875rem'
  });
  
  const getCode = async () => {
    await AuthService.getOtp( (validateEmail(userName))?userName:userName.replace(/\D/g, '') )
    .then((response)=>{
      console.log(response);
      if(response?.status===200){ 
        if(!isOTPShow){    setIsOTPShow(true);     } 
        if(isResend){
          setMessage('');
          setIsResend(false);
        }
        setAlertClass(styles.text_primary); 
        setMessage(`Enter the verification code sent on ${userName}`);
      }else{
        setAlertClass('text-danger');
        setMessage(response?.data.message);
      }
    },error=>{  
      setAlertClass('text-danger');    
      setMessage(error?.error)
    })
  };
  const verifyCode = async ()=>{ 
    let payload = {
      username : (validateEmail(userName))?userName:userName.replace(/\D/g, ''),
      otp: otp
    }
    await AuthService.verifyOtp( payload ).then((response)=>{      
      if(response){
        if(response.status===200){
          if(isResend){
            setIsResend(false);          
          }
          setAlertClass(''); 
          setMessage(''); 
          sessionStorage.setItem("auth_token", response.data.token);
          sessionStorage.setItem("user_data", JSON.stringify(response.data.data));
          router.push('/dashboard/profile');
        }else{
          setAlertClass('text-danger');
          setMessage(response?.data.message);      
        }
      }
    },error=>{
      console.log(error);
      setAlertClass('text-danger'); 
      setMessage('Please enter valid otp.');
    })
  };
  const setstepOneData=()=>{
    setFormSubTitle('Continue With Email or Phone Number'); 
    setImgProps({
      image: 'email-phone.svg', 
      altText:'email-phone',
      minwidth:'39.25rem',
      height: '27.875rem'
    });
    setImgeProps({
      imageOne:{image: 'email.svg', altText:"email", height:'20.75rem'},
      imageTwo:{image:'phone-number.svg',altText:'phone-number', height:'13.25rem'},    
      imageThree:{image:'arrow-indicate1.png', altText:'arrow-indicate', height:'11.438rem'},
      connectClass:styles.indicate_one,
      minwidth:'39.75rem',
      height: '27.875rem'
    });
  }
  const setstepTwoData=()=>{
    setFormHeading('Headed your way');
    setFormSubTitle('Start Your Journey with Us');  
    setImgProps({
      image: 'enter-otp.svg', 
      altText:'enter-otp',
      minwidth:'38rem',
      height: '27.875rem'
    })
    setImgeProps({
      imageOne:{image: 'your-code.png', altText:"your-code", height:'9.563rem'},
      imageTwo:{image:'enter-otp.png',altText:'enter-otp', height:'16rem'},    
      imageThree:{image:'arrow-indicate2.png', altText:'arrow-indicate2', height:'9.625rem'},
      connectClass:styles.indicate_two,
      minwidth:'39.75rem',
      height: '27.875rem'
    });
  }
  useEffect(()=>{
    if(isShowForm===true){
      setFormSubTitle('Continue With Email or Phone Number'); 
      setstepOneData();
    }
  },[isShowForm]);
  useEffect(()=>{
    if(isOTPShow===true){
      setstepTwoData();
    }
  },[isOTPShow])  
  useEffect(()=>{
    if(isOTPShow && message){
      setTimeout(() => {
        setIsResend(true);
      }, 10000)
    }
  },[isOTPShow, message]) 
  
  const backToLoginForm=()=>{ 
    setIsOTPShow(false);
    setstepOneData();
    setMessage('');
    if(isResend){
      setIsResend(false);          
    }
  }
  return (
    <main className={styles.main}>
        {/* <div className={styles.container}> */}
          <div className={`d-flex ${styles.box_wrap}`}>
            <div className={styles.box_one}>
              <div className={styles.title_image}>
                <Image
                  src="/PolygogoBlack.png"
                  width={176}
                  height={35}
                  alt="Poly go go Black"  
                  title='Poly go go'              
                />
              </div>
              {/* <div className={styles.step_image}>
                <img src={`/images/${imgProps.image}`} alt={imgProps.altText} className='mw-100 w-auto' style={{minHeight:imgProps.height}} />
              </div> */}
              <div className={styles.box_image_wrap} style={{height: `${imageProps.height}` }}>
                <div className='position-relative h-100 w-100'>
                  <div className={`mw-100 ${styles.img_one}`}>
                    <div className={`mw-100 position-relative`}>
                      <img
                        src={`/images/${imageProps.imageOne.image}`}
                        alt={`${imageProps.imageOne.altText}`} 
                        style={{height: `${imageProps.imageOne.height}` }}   
                        className={`mw-100`}                                
                      />
                      {isShowForm && !isOTPShow && (validateEmail(userName) && !testPhone(userName)) && <span className={`${styles.d_text} ${styles.email_text}`} >{userName}</span>}
                      {isShowForm && isOTPShow  && <span className={`${styles.d_text} ${styles.otp_text}`} >{otp}</span>}
                    </div>                    
                  </div>
                  <div className={`mw-100 ${styles.img_two} ${isShowForm && !isOTPShow?styles.email_img_box:''}`}>
                    <div className={`mw-100 position-relative`}>                
                      <img
                        src={`/images/${imageProps.imageTwo.image}`}
                        alt={`${imageProps.imageTwo.altText}`}                    
                        style={{height: `${imageProps.imageTwo.height}` }}                   
                        className={`mw-100`} 
                      />
                      {isShowForm && !isOTPShow && (testPhone(userName) && !validateEmail(userName)) && <span className={`${styles.d_text} ${styles.phone_text}`} >{userName}</span>}
                    </div>
                  </div>                  
                </div>
                <img
                  src={`/images/${imageProps.imageThree.image}`}
                  alt={`${imageProps.imageThree.altText}`}
                  style={{height: `${imageProps.imageThree.height}` }} 
                  className={`mw-100 ${styles.connect_arrow} ${imageProps.connectClass}`}                                
                />
              </div>
              <div className='d-flex align-items-end justify-content-start'>
                <img className={`mw-100 ${styles.bottom_left_circle}`} src='/images/Shape-left.png' alt="Shape-left" />
                <div className={styles.copyright}>© 2023 Polygogo. All rights reserved.</div>
              </div>             
            </div>
            <div className={styles.box_two}> 
              <div className={`d-block mb-4 d-lg-none  ${styles.title_image}`}>
                <Image
                  src="/PolygogoWhite.png"
                  width={176}
                  height={35}
                  alt="PolygogoWhite"
                  title='Poly go go'                
                />
              </div>               
              <div className={`position-relative ${styles.form_wrap} ${styles.after_before_dots}`}>                
                {isOTPShow===true && <div className={`${styles.back_btn}`} onClick={()=>backToLoginForm()} ><img src="/icons/back_arrow.svg" alt="right-arrow" /></div> } 
                  <div className='w-100'>                    
                    <h1 className={`text-center ${styles.heading_one} ${styles.text_primary}`}>{formHeading}</h1> 
                    <p className={styles.sub_title}>{formSubTitle}</p>
                    {!isShowForm?(<>
                      <div className='mt-4'></div>
                      <SocialMideiaLogin />                                          
                      <p className='text-center mt-2 mb-3'>Continue With <span className='fw-bold'>Email</span> or <span className='fw-bold'>Phone Number</span></p>
                      <button type='submit' className={`d-block ms-auto me-auto mt-3 ${styles.btn} ${styles.btn_primary}`} onClick={()=>setIsShowForm(true)}>
                        <span className='fw-bold'>{btnText}</span>
                        <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
                      </button>
                    </>):(<>
                      {isOTPShow!==true?(<> 
                        <LoginForm userName={userName} setUserName={setUserName} loginUser={getCode} />                        
                        <SocialMideiaLogin />
                      </>):(<>              
                        <VerifyCodeForm otp={otp} setOTP={setOTP} submitCode={verifyCode} buttonLabel={buttonLabel} />                  
                      </>)}
                      {message && <div className='ms-3 me-3 mt-3'>
                        {isResend && 
                          <p className='text-center mt-2'>Didn't received an OTP, <span onClick={()=>getCode()} className={`fw-bold ${styles.link}`}>Resend Code</span></p>
                        }
                        <p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p>
                      </div>}
                    </>)} 
                  </div>
                </div>
              </div>                                
            </div>
        {/* </div> */}
    </main>
  )
}

export default LoginRegister;