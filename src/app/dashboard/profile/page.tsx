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

export default function Profile() {
  const [currentStep, setCurrentStep] = useState(1); 
  const [ismanual, setIsmanual] = useState(false); 
  const [skip, setSkip] = useState<any | null>(null); 
  const [userData, SetUseData]= useState(null);
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
    if(skip!==null && skip===prev){
      setCurrentStep(step-2);      
    }else{
      setCurrentStep(step-1);
    }    
  }  
  useEffect(()=>{
    if(currentStep===1){
      setIsmanual(false);
    }
  },[currentStep]);
  useEffect(()=>{
    const user = AuthService.getCurrentUser();
    SetUseData(user);
  },[])
   // console.log(userData);
  return (
    <div className={dstyles.page_container}>        
      {currentStep===1 && ismanual===false && <ProfileSetup currentStep={currentStep} setCurrentStep={setCurrentStep} nextStep={nextStep} prevStep={prevStep} ismanual={ismanual} setIsmanual={setIsmanual} setSkip={setSkip} userData={userData}  /> }
      {currentStep===2 && ismanual===true && <BusinessSetup currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} /> }
      {currentStep===3 && <BusinessWebsite currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} /> }
      {currentStep===4 && <VerifyUser currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} /> }
      {currentStep===5 && <UpdatePhotoAndTitle currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />}
      {currentStep===6 && <ReviewPlateformsSetup currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setSkip={setSkip} userData={userData} />}
    </div>
  );
};