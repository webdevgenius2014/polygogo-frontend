import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useState, useEffect } from 'react'
import GetCode from './verify-user/getCode'
import VerifyCode from './verify-user/verifyCode'
import { validateEmail, validatePhone, testPhone} from "../../../helpers/formatCheck";
import AuthService from '../../../services/auth.service';
type Props={
    currentStep:any;   
    userData:any; 
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;   
     
};
const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email / Phone is required')
        .test('emailOrPhone', 'Email / Phone is invalid', (value) => {
            return validateEmail(value) || validatePhone(value.replace(/\D/g, ''));
        }
    )      
});
const VerifyUser: React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData})=>{
    const [isDisabled, setIsDisabled] = useState(true);
    const [verifyName, setVerifyName]= useState<string | ''>('');
    const [verifyOtp, setVerifyOtp]= useState<string | ''>('');
    const [isShowOtpForm, setShowOtpForm]=useState(false);
    const [isResend, setIsResend]=useState(false);  

    const getCode = async () => {
        setIsDisabled(false);
        setShowOtpForm(true);
        await AuthService.getOtp( (validateEmail(verifyName))?verifyName:verifyName.replace(/\D/g, '') )
        .then((response)=>{
          console.log(response);
          if(response?.status===200){ 
            // if(!isOTPShow){ setIsOTPShow(true);     } 
            // if(isResend){
            //   setMessage('');
            //   setIsResend(false);
            // }
            // setAlertClass(styles.text_primary); 
            // setMessage(`Enter the verification code sent on ${userName}`);
          }else{
            // setAlertClass('text-danger');
            // setMessage(response?.data.message);
          }
        },error=>{  
            // setAlertClass('text-danger');    
            // setMessage(error?.error)
        })
    };
    const verifyCode = async ()=>{ 
        let payload = {
          username : (validateEmail(verifyName))?verifyName:verifyName.replace(/\D/g, ''),
          otp: verifyOtp
        }
        nextStep(currentStep);
        await AuthService.verifyOtp( payload ).then((response)=>{      
          if(response){
            if(response.status===200){
            //   if(isResend){
            //     setIsResend(false);          
            //   }
            //   setAlertClass(''); 
            //   setMessage(''); 
            //   sessionStorage.setItem("auth_token", response.data.token);
            //   router.push('/dashboard/profile');
            }else{
            //   setAlertClass('text-danger');
            //   setMessage(response?.data.message);      
            }
          }
        },error=>{
            console.log(error);
            //   setAlertClass('text-danger'); 
            //   setMessage('Please enter valid otp.');
        })
    };    
    useEffect(()=>{
        if(isShowOtpForm){
          setTimeout(() => {
            setIsResend(true);
          }, 6000)
        }
    },[isShowOtpForm]);
    
    const updateMobile=()=>{
        setIsDisabled(false);
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
    }
    return(<> 
        {isShowOtpForm?(<>
            <VerifyCode  {...props} />            
        </>):(<>
            <GetCode {...props} />
        </>)}
    </>)
}
export default VerifyUser;