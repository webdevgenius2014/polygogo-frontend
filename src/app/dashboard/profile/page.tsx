'use client';
import { useEffect, useState } from 'react';
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import ProfileSetup from './profileSetup'
import BusinessSetup from './manualBusinessSetup'
import BusinessWebsite from './businessWebsite'
import VerifyUser from './verifyUser'
import UpdatePhotoAndTitle from './updateProfilePhoto'
import ReviewPlateformsSetup from "./reviewPlateforms"
import AuthService from '../../../services/auth.service';
import ProfileService from '../../../services/profile.service';
import { validateEmail } from "../../../helpers/formatCheck";
export default function Profile() {
  const [currentStep, setCurrentStep] = useState(1); 
  const [ismanual, setIsmanual] = useState(false); 
  const [skip, setSkip] = useState<any | null>(null); 
  const [userData, SetUseData]= useState<any | null>(null);
  const [name, setName]= useState<string | ''>(''); 
  const [company, setCompany]= useState<string | ''>(''); 
  const [companyDetails, setCompanyDetails]=useState({company_name:'', address_one:'', address_two:'', city:'',state:'',zipcode:'', resources_strength:'', revanue:''});
  const [isVarified, setIsVerified]=useState(false);
  const [userName, setUserName]=useState<string | ''>(''); 
  const [businessUrl, setBusinessUrl]=useState<string | ''>(''); 
  const [verifyName, setVerifyName]= useState<string | ''>('');
  const [verifyOtp, setVerifyOtp]= useState<string | ''>('');
  const [isDisabled, setIsDisabled] = useState(true);   
  const [isShowOtpForm, setShowOtpForm]=useState(false);
  const [isResend, setIsResend]=useState(false); 
  const [message, setMessage]=useState("");
  const [alertClass, setAlertClass]=useState('');
  const digits = [{ id: 1, digit: '' },{ id: 2, digit: '' },{ id: 3, digit: '' },{ id: 4, digit: '' },{ id: 5, digit: '' },{ id: 6, digit: '' }];
  const [otpDigits, setOtpDigits]=useState(digits); 
  const [job, setJob]= useState<string | ''>('');
  const [fileName, setFileName] = useState<File | ''>('');
  const nextStep=(step:any)=>{ 
    let next= step+1;   
    if(skip!==null && skip===next){
      setCurrentStep(step+2);      
    }else{
      setCurrentStep(step+1);
    }
  }
  const prevStep=(step:any)=>{
    let prev = step-1;
    console.log(skip);
    if(skip!==null && skip===prev){
      setCurrentStep(step-2);      
    }else{
      setCurrentStep(step-1);
    }    
  }
  useEffect(()=>{
    if(ismanual===false && company.length===0){
      setIsDisabled(true);
    }else{
      setIsDisabled(false);
    }
  },[company, ismanual])
  const getCurrentUserDetails = async()=>{ 
    await ProfileService.getCurrentUser().then((response)=>{      
      if(response){          
        if(response.status===200 && response.data.error===false){            
          SetUseData(response.data.data);
        }else{
          SetUseData(AuthService.getCurrentUser);
        }
      }
    },error=>{
      console.log(error);           
    })
  }
  const saveCompanyProfileData = async(payload:any)=>{     
    // nextStep(currentStep);      
    await ProfileService.completeProfile( payload ).then((response)=>{      
      if(response){
        if(response.status===200){
          nextStep(currentStep);
        }else{
          console.log(response);   
        }
      }
    },error=>{
      console.log(error);           
    });
  };
  const getCode = async (payload:any) => { 
    // if(!isShowOtpForm){setShowOtpForm(true)}   
    await ProfileService.getOtp(payload).then((response)=>{ 
      console.log('response'); 
      console.log(response);   
      if(response?.status===200){        
        if(!isShowOtpForm){ setShowOtpForm(true)} 
        if(isDisabled){ setIsDisabled(false)}
        if(isResend){
          setMessage('');
          setIsResend(false);
        }
        setAlertClass(dstyles.text_primary); 
        setMessage(`Enter the verification code sent on ${verifyName}`);
      }else{
        setAlertClass('text-danger');
        setMessage(response?.data.message);
      }
    },error=>{  
      console.log("hello i am here");
      setAlertClass('text-danger');    
      setMessage(error?.error)
    })
  };
  useEffect(()=>{
    if(userData && userData.emailVerified===true && userData.phoneVerified===true){
      setIsVerified(true);
    }
  },[userData]);
  const verifyCode = async (payload:any)=>{   
    // nextStep(currentStep);     
    await ProfileService.VerifyOtp( payload ).then((response)=>{      
      if(response){
        if(response.status===200){
          if(isResend){
            setIsResend(false);          
          }
          setAlertClass(''); 
          setMessage('');  
          sessionStorage.setItem("auth_token", response.data.token);
          sessionStorage.setItem("user_data", JSON.stringify(response.data.data));           
          nextStep(currentStep);
          getCurrentUserDetails()
        }else{
          setAlertClass('text-danger');
          setMessage(response?.data.message);      
        }
      }
    },error=>{
      console.log(error);
      setAlertClass('text-danger'); 
      setMessage('Please enter valid otp.');
    });
  }; 
  const commmonProps={
    currentStep:currentStep,
    setCurrentStep: setCurrentStep,
    nextStep:nextStep,
    prevStep:prevStep,
    setSkip:setSkip,
    userData:userData
  }
  const stepOneProps={
    ismanual:ismanual,
    setIsmanual:setIsmanual,
    name:name,
    company:company,
    setName:setName, 
    setCompany:setCompany, 
    companyDetails: companyDetails,
    setCompanyDetails:setCompanyDetails, 
    saveData:saveCompanyProfileData,
    isDisabled:isDisabled
  }
  const stepTwoProps={    
    name:name,
    companyDetails: companyDetails,
    setCompanyDetails:setCompanyDetails,
    saveData:saveCompanyProfileData   
  }   
  const stepThreeProps={
    userName:userName, 
    setUserName:setUserName,
    businessUrl:businessUrl, 
    setBusinessUrl:setBusinessUrl,
    saveData: saveCompanyProfileData
  }
  const stepFourProps={
    verifyName:verifyName, setVerifyName:setVerifyName,
    verifyOtp: verifyOtp, setVerifyOtp:setVerifyOtp,
    isDisabled: isDisabled, setIsDisabled:setIsDisabled,   
    isShowOtpForm:isShowOtpForm, setShowOtpForm:setShowOtpForm,
    isResend: isResend, setIsResend:setIsResend,
    message: message, setMessage:setMessage,
    alertClass: alertClass, setAlertClass: setAlertClass,
    getCode:getCode, verifyCode:verifyCode,
    otpDigits:otpDigits, setOtpDigits:setOtpDigits
  }
  const stepFiveProps={
    job: job, setJob:setJob,
    fileName:fileName, setFileName:setFileName,
    saveData: saveCompanyProfileData
  }
  useEffect(()=>{
    if(currentStep===1){
      setIsmanual(false);     
    }
  },[currentStep]);
  useEffect(()=>{ 
    getCurrentUserDetails();    
  },[]);
  useEffect(()=>{
    if(userData && userData.name ){
      setName(userData.name?userData.name:name);        
    }
    if(userData && userData.companies.length>0){
      setCompany(userData.companies[0].company_name?userData.companies[0].company_name:company)
      setCompanyDetails({ 
        company_name: userData.companies[0].company_name?userData.companies[0].company_name:companyDetails.company_name, 
        address_one: userData.companies[0].address_one?userData.companies[0].address_one:companyDetails.address_one,
        address_two: userData.companies[0].address_two?userData.companies[0].address_two:companyDetails.address_two, 
        city: userData.companies[0].city?userData.companies[0].city:companyDetails.city,
        state: userData.companies[0].state?userData.companies[0].state:companyDetails.state,
        zipcode: userData.companies[0].zipcode?userData.companies[0].zipcode:companyDetails.zipcode, 
        resources_strength: userData.companies[0].resources_strength?userData.companies[0].resources_strength:companyDetails.resources_strength, 
        revanue: userData.companies[0].revanue?userData.companies[0].revanue:companyDetails.revanue
      })
    }
    if(userData && userData.companies.length>0){
      setBusinessUrl(userData.companies[0].bussiness_url?userData.companies[0].bussiness_url:businessUrl)
    }
    if(userData && userData.username ){
      setUserName(userData.username?userData.username:userName);
    }
},[userData]);

useEffect(()=>{
  if(userData && userData.emailVerified===true && userData.phoneVerified===true){
      setSkip(currentStep+1);
  }
},[userData]);
  console.log('currentStep:'+currentStep);
  return (
    <div className={dstyles.page_container}>             
        {currentStep===1 && ismanual===false && <ProfileSetup {...commmonProps} {...stepOneProps} /> }
        {currentStep===2 && ismanual===true && <BusinessSetup {...commmonProps} {...stepTwoProps} /> }
        {currentStep===3 && <BusinessWebsite {...commmonProps} {...stepThreeProps} /> }
        {isVarified?(<>
          {currentStep===4 && <UpdatePhotoAndTitle {...commmonProps} {...stepFiveProps} />}
          {currentStep===5 && <ReviewPlateformsSetup currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />}
        </>):(<>
          {currentStep===4 && <VerifyUser {...commmonProps} {...stepFourProps} /> }
          {currentStep===5 && <UpdatePhotoAndTitle {...commmonProps} {...stepFiveProps} />}
          {currentStep===6 && <ReviewPlateformsSetup currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />} 
        </>)}
             
    </div>
  );
};