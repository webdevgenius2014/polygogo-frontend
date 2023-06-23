'use client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
import ProfileSetup from '../../profile/profileSetup'
import BusinessSetup from '../../profile/manualBusinessSetup'
import BusinessWebsite from '../../profile/businessWebsite'
import UpdatePhotoAndTitle from '../../profile/updateProfilePhoto'
import ReviewPlateformsSetup from '../../review-platforms/reviewPlateform';
import ProfileService from '../../../../services/profile.service';
export default function Profile() {
    const [currentStep, setCurrentStep] = useState(1); 
    const [ismanual, setIsmanual] = useState(false); 
    const [skip, setSkip] = useState<any | null>(null);
    const [name, setName]= useState<string | ''>(''); 
    const [company, setCompany]= useState<string | ''>(''); 
    const [companyDetails, setCompanyDetails]=useState({company_name:'', address_one:'', address_two:'', city:'',state:'',zipcode:'', resources_strength:'', revanue:''});   
    const [userName, setUserName]=useState<string | ''>(''); 
    const [businessUrl, setBusinessUrl]=useState<string | ''>('');    
    const [isDisabled, setIsDisabled] = useState(true); 
    const [message, setMessage]=useState("");
    const [alertClass, setAlertClass]=useState('');  
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
    const saveProfile= async(payload:any)=>{
        setIsLoading(true);
        await ProfileService.completeProfile( payload ).then((response)=>{      
        if(response){        
            if(response?.status===200){ 
            setIsLoading(false);       
            nextStep(currentStep);            
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
        saveProfile(payload);
    };   
    const commmonProps={
        currentStep:currentStep,
        setCurrentStep: setCurrentStep,
        nextStep:nextStep,
        prevStep:prevStep,
        setSkip:setSkip,       
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
    }   
    const stepFiveProps={
        job: job, setJob:setJob,
        profilePhoto:profilePhoto, setProfilePhoto:setProfilePhoto,
        saveData: saveProfile,
        message:message, alertClass: alertClass,
        setMessage:setMessage,      
    }
    const stepSixProps={
        googlePlaceId: googlePlaceId,
        facebookPageId:facebookPageId,
        removePlateformId: saveCompanyProfileData,
        savePlatform:saveProfile
    } 
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