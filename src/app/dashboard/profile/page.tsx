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
export default function Profile() {
  const [currentStep, setCurrentStep] = useState(1); 
  const [ismanual, setIsmanual] = useState(false); 
  const [skip, setSkip] = useState<any | null>(null); 
  const [userData, SetUseData]= useState<any | null>(null);
  const [name, setName]= useState<string | ''>(''); 
  const [company, setCompany]= useState<string | ''>(''); 
  const [companyDetails, setCompanyDetails]=useState({company_name:'', address_one:'', address_two:'', city:'',state:'',zipcode:'', resources_strength:'', revanue:''});
  const [userName, setUserName]=useState<string | ''>(''); 
  const [businessUrl, setBusinessUrl]=useState<string | ''>(''); 
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
  const saveCompanyProfileData = async(payload:any)=>{     
    nextStep(currentStep);      
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
    saveData:saveCompanyProfileData
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
  useEffect(()=>{
    if(currentStep===1){
      setIsmanual(false);
    }
  },[currentStep]);
  useEffect(()=>{    
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
    getCurrentUserDetails();    
  },[]);   
  return (
    <div className={dstyles.page_container}>        
      {currentStep===1 && ismanual===false && <ProfileSetup {...commmonProps} {...stepOneProps} /> }
      {currentStep===2 && ismanual===true && <BusinessSetup {...commmonProps} {...stepTwoProps} /> }
      {currentStep===3 && <BusinessWebsite {...commmonProps} {...stepThreeProps} /> }
      {currentStep===4 && <VerifyUser currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} /> }
      {currentStep===5 && <UpdatePhotoAndTitle currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />}
      {currentStep===6 && <ReviewPlateformsSetup currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />}
    </div>
  );
};