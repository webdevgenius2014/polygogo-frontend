import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { useEffect } from 'react'
import GetCode from './verify-user/getCode'
import VerifyCode from './verify-user/verifyCode'
type Props={
  currentStep:any;   
  userData:any; 
  nextStep:(val:any)=>void;
  prevStep:(val:any)=>void;
  setSkip:(val:any)=>void; 
  verifyName:any; 
  setVerifyName:(val:any)=>void;
  verifyOtp: any;
  setVerifyOtp:(val:any)=>void; 
  isDisabled: boolean;
  setIsDisabled:(val:boolean)=>void;   
  isShowOtpForm:boolean;
  setShowOtpForm:(val:boolean)=>void;
  isResend: boolean;
  setIsResend:(val:boolean)=>void;
  message: any;
  setMessage:(val:any)=>void;
  alertClass: any;
  setAlertClass: (val:any)=>void;
  getCode:(val:any)=>void; 
  verifyCode:(val:any)=>void
  digits:any;
  otpDigits:any; 
  setOtpDigits:(val:any)=>void;
};
const VerifyUser: React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData, verifyName, setVerifyName, verifyOtp, setVerifyOtp, isDisabled, setIsDisabled, isShowOtpForm, setShowOtpForm, isResend, setIsResend, message, alertClass, getCode, verifyCode, otpDigits, setOtpDigits, setMessage })=>{
  useEffect(()=>{
    if(isShowOtpForm){
      setIsDisabled(false);
      setTimeout(() => {
        setIsResend(true);
      }, 6000)
    }else{
      setIsDisabled(true);
    }
  },[isShowOtpForm]); 

  const updateMobile=()=>{  
    setMessage('');
    setIsDisabled(true);
    setShowOtpForm(false);    
  }    
  const props={
    verifyName:verifyName, 
    setVerifyName:setVerifyName ,
    verifyOtp:verifyOtp,
    setVerifyOtp:setVerifyOtp,
    getCode:getCode, 
    verifyCode:verifyCode,
    currentStep:currentStep,
    prevStep:prevStep,
    isDisabled:isDisabled,
    isResend:isResend,
    updateMobile:updateMobile, 
    userData: userData,
    message:message,
    alertClass:alertClass,
    otpDigits:otpDigits, 
    setOtpDigits:setOtpDigits       
  } 
  useEffect(()=>{
    if(isShowOtpForm && message){
      setTimeout(() => {
        setIsResend(true);
      }, 10000)
    }
  },[isShowOtpForm, message])   
  return(<> 
    {isShowOtpForm?(<>
      <VerifyCode  {...props} />            
    </>):(<>
      <GetCode {...props} />
    </>)}    
  </>)
}
export default VerifyUser;