'use client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import ProfileSetup from './profileSetup'
import BusinessSetup from './manualBusinessSetup'
import BusinessWebsite from './businessWebsite'
import VerifyUser from './verifyUser'
import UpdatePhotoAndTitle from './updateProfilePhoto'
// import ReviewPlateformsSetup from "./reviewPlateforms"
import ReviewPlateformsSetup from '../review-platforms/reviewPlateform';
import AuthService from '../../../services/auth.service';
import ProfileService from '../../../services/profile.service';
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
  const [profilePhoto, setProfilePhoto] = useState<File | []>([]); 
  const [ googlePlaceId, setGooglePlaceId]= useState<string | ''>('');
  const [ facebookPageId, setFacebookPageId]= useState<string | ''>('');
  const [isloading, setIsLoading]=useState(false);
  const nextStep=(step:any)=>{ 
    let next= step+1; 

    if(skip!==null && skip===next){
      setCurrentStep(step+2);      
    }else if(step<6){ 
      setCurrentStep(step+1);
    }else{
      return;
    }
  }
  const prevStep=(step:any)=>{
    let prev = step-1;
    if(skip!==null && skip===prev){
      setCurrentStep(step-2);      
    }else if(step >1){
      setCurrentStep(step-1);
    }else{
      return;
    }    
  }  
  useEffect(()=>{    
    if(ismanual===false && company.length===0){
      setIsDisabled(true);
    }else{
      setIsDisabled(false);
    }
  },[company, ismanual]);  
  const notify = (message:string, notifiyId?:string) => {    
    toast.error(message, {
      toastId: notifiyId,
      position: toast.POSITION.TOP_CENTER
    });
  }
  const getCurrentUserDetails = async()=>{     
    await ProfileService.getCurrentUser().then((response)=>{      
      if(response){          
        if(response?.status===200 && response?.data.error===false){            
          SetUseData(response?.data?.data);
        }else{
          SetUseData(AuthService.getCurrentUser);
        }
      }
    },error=>{      
      notify(error.data.message, 'userDetails');               
    })
  }   
  const saveProfile= async(payload:any)=>{
    setIsLoading(true);
    await ProfileService.completeProfile( payload ).then((response)=>{      
      if(response){        
        if(response?.status===200){ 
          setIsLoading(false);       
          nextStep(currentStep);
          getCurrentUserDetails();          
        }else if(response?.status===422){          
          notify(response?.data?.error, 'completeProfile'); 
        }else{
          notify('Something went wrong, please try again.', 'completeProfile'); 
        } 
      }
    },error=>{ 
      notify(error?.data?.message, 'completeProfile');
    });
  } 
  const saveCompanyProfileData =(payload:any)=>{ 
    if(currentStep===1 && ismanual===false){
      setSkip(2);
    }
    if(currentStep===3 && isVarified===true){
      setSkip(4);
    }     
    saveProfile(payload);
  }; 
  const getCode = async (payload:any) => {
    setIsLoading(true);    
    await ProfileService.getOtp(payload).then((response)=>{  
      if(response?.status===200){
        setIsLoading(false);         
        if(!isShowOtpForm){ setShowOtpForm(true)} 
        if(isDisabled){ setIsDisabled(false)}
        if(isResend){
          setMessage('');
          setIsResend(false);
        }
        setAlertClass(dstyles.text_primary); 
        setMessage(`Enter the verification code sent on ${verifyName}`);        
      }else if(response?.status===422){          
        notify(response?.data?.error, 'getOTP'); 
      }else{
        notify('Something went wrong, please try again.', 'getOTP'); 
      }
    },error=>{ 
      notify(error?.data?.message, 'getOTP');
    })
  };
  useEffect(()=>{
    if(userData && userData.emailVerified===true && userData.phoneVerified===true){
      setIsVerified(true);
    }
  },[userData]);
  const verifyCode = async (payload:any)=>{   
    setIsLoading(true);    
    await ProfileService.VerifyOtp(payload).then((response)=>{  
      if(response?.status===200){   
        setIsLoading(false);      
        if(isResend){
          setIsResend(false);          
        }
        setAlertClass(''); 
        setMessage('');  
        sessionStorage.setItem("auth_token", response?.data?.token);
        sessionStorage.setItem("user_data", JSON.stringify(response?.data?.data));           
        nextStep(currentStep);
        getCurrentUserDetails();     
      }else if(response?.status===422){          
        notify(response?.data?.error, 'verifyOTP'); 
      }else{
        notify('Something went wrong, please try again.', 'verifyOTP'); 
      }
    },error=>{
      notify('Please enter valid otp.', 'verifyOTP'); 
    })
  }; 
  useEffect(()=>{
    if(userData){
      setName(userData?.name?userData?.name:name); 
      setCompany(userData?.companies[0]?.company_name?userData.companies[0].company_name:company)
      setCompanyDetails({ 
        company_name: userData?.companies[0]?.company_name?userData?.companies[0]?.company_name:companyDetails.company_name, 
        address_one: userData?.companies[0]?.address_one?userData?.companies[0]?.address_one:companyDetails.address_one,
        address_two: userData?.companies[0]?.address_two?userData?.companies[0]?.address_two:companyDetails.address_two, 
        city: userData?.companies[0]?.city?userData.companies[0].city:companyDetails.city,
        state: userData?.companies[0]?.state?userData.companies[0].state:companyDetails.state,
        zipcode: userData?.companies[0]?.zipcode?userData?.companies[0]?.zipcode:companyDetails.zipcode, 
        resources_strength: userData?.companies[0]?.resources_strength?userData?.companies[0]?.resources_strength:companyDetails.resources_strength, 
        revanue: userData?.companies[0]?.revanue?userData.companies[0]?.revanue:companyDetails.revanue
      });
      setBusinessUrl(userData?.companies[0]?.bussiness_url?userData?.companies[0]?.bussiness_url:businessUrl); 
      setUserName(userData?.companies[0]?.username?userData?.companies[0]?.username:userName);
      setJob(userData?.job_title ? userData?.job_title:job);
      setProfilePhoto(userData?.profile_img?userData.profile_img:profilePhoto);
      setGooglePlaceId(userData?.companies[0]?.googlePlaceId?userData?.companies[0]?.googlePlaceId:googlePlaceId);
      setFacebookPageId(userData?.companies[0]?.facebookPageId?userData?.companies[0]?.facebookPageId:facebookPageId)
    }    
  },[userData]);
  const commmonProps={
    currentStep:currentStep,
    setCurrentStep: setCurrentStep,
    nextStep:nextStep,
    prevStep:prevStep,
    setSkip:setSkip,
    userData:userData,
    notify:notify,
    isloading:isloading,
  }
  const stepOneProps={
    ismanual:ismanual,
    setIsmanual:setIsmanual,
    name:name,
    company:company,
    setName:setName, 
    setCompany:setCompany, 
    companyDetails: companyDetails,
    googlePlaceId: googlePlaceId,
    setGooglePlaceId:setGooglePlaceId,
    setCompanyDetails:setCompanyDetails, 
    saveData:saveCompanyProfileData,
    isDisabled:isDisabled,
    message:message, alertClass: alertClass,
  }
  const stepTwoProps={    
    name:name,
    companyDetails: companyDetails,
    setCompanyDetails:setCompanyDetails,
    saveData:saveCompanyProfileData,
    message:message, alertClass: alertClass     
  }   
  const stepThreeProps={
    userName:userName, 
    setUserName:setUserName,
    businessUrl:businessUrl, 
    setBusinessUrl:setBusinessUrl,
    saveData: saveCompanyProfileData,
    message:message, alertClass: alertClass,
    ismanual:ismanual,
    setIsVerified:setIsVerified 
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
    digits:digits, otpDigits:otpDigits, setOtpDigits:setOtpDigits
  }
  const stepFiveProps={
    job: job, setJob:setJob,
    profilePhoto:profilePhoto, setProfilePhoto:setProfilePhoto,
    saveData: saveProfile,
    message:message, alertClass: alertClass,
    setMessage:setMessage,
    isVarified:isVarified
  }
  const stepSixProps={
    googlePlaceId: googlePlaceId,
    facebookPageId:facebookPageId,
    removePlateformId: saveCompanyProfileData,
    savePlatform:saveProfile
  }
  useEffect(()=>{ 
    getCurrentUserDetails();    
  },[]);
  useEffect(()=>{
    if(currentStep===1){
      setIsmanual(false);     
    }
  },[currentStep]);
  return (
    <div className={dstyles.page_container}>       
      {currentStep===1 && ismanual===false && <ProfileSetup {...commmonProps} {...stepOneProps} /> }
      {currentStep===2 && ismanual===true && <BusinessSetup {...commmonProps} {...stepTwoProps} /> }
      {currentStep===3 && <BusinessWebsite {...commmonProps} {...stepThreeProps} /> }
      {currentStep===4 && <VerifyUser {...commmonProps} {...stepFourProps} /> }
      {currentStep===5 && <UpdatePhotoAndTitle {...commmonProps} {...stepFiveProps} />}
      {currentStep===6 && <ReviewPlateformsSetup {...commmonProps} {...stepSixProps} />}   
      <ToastContainer />           
    </div>
  );
};