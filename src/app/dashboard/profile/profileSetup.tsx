import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useState, useEffect } from 'react';
import {
    useLoadScript,
    Autocomplete,
  } from '@react-google-maps/api'
import ProfileService from '../../../services/profile.service';  
interface ProfileInterface {
    name: string;
    companyName:string;
}
type Props={
    currentStep:any;
    userData:any;
    setCurrentStep:(val:any)=>void;
    ismanual:boolean;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;    
    setIsmanual:(val:boolean)=>void;    
};
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    //companyName: Yup.string().required('Company name is required')
});
const googleKey=process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const scriptOptions= {
    googleMapsApiKey: googleKey,
    libraries: ['places'],
}
const ProfileSetup: React.FC<Props>=({currentStep, setCurrentStep, nextStep, prevStep, setSkip, ismanual, setIsmanual, userData})=>{
    const [name, setName]= useState<string | ''>('');
    const [company, setCompany]= useState<string | ''>('');
    const { isLoaded, loadError } = useLoadScript(scriptOptions);
    const [autocomplete, setAutocomplete] = useState(null)
        
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<ProfileInterface>({resolver: yupResolver(validationSchema)});
    const setupManually=()=>{        
        setIsmanual(true); 
        setCurrentStep(2);  
    }  
    useEffect(()=>{
        if(ismanual){
            setSkip(null);
        }else{
            setSkip(2);
        }
    },[ismanual]); 

    const onLoad = (autocompleteObj:any) => {
        setAutocomplete(autocompleteObj)
    }
    const onPlaceChanged = (e:any) => {
        if (autocomplete) {
        //   const place = autocomplete.getPlace()
        //   if ('place_id' in place) {
        //     router.push(`/place/${place.place_id}`)
        //   }
        }
    }
    const saveData = async()=>{        
        let payload = {
            name : name,
            company: company
        }
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
        })

    };
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Let’s start by Setting up your Profile.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={saveData}
            isbackbutton={false}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.image_wrap}>
                    <img src="/dashboard/my-profile.png" alt="my-profile" />
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <h3 className={dstyles.title}>Enter your name and Company Name.</h3>
                        <div className={`${dstyles.mx_362}`}>
                            <Input
                                name="name"                                               
                                register={register}                                                
                                value={name}                               
                                handleChange={(e:any)=>{setName(e.target.value)}} 
                                placeholder="Name"
                                error={formState.errors.name?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                iconClass={`position-relative ${dstyles.input_user} ${dstyles.icon_wrap}`}
                                className={`form-control ${dstyles.input_field} ${formState.errors.name ? dstyles.is_invalid : ''}`}         
                            />
                            { loadError && (
                                <div className={`text-center ${dstyles.text_lg}`}>Google Map script can't be loaded, please reload the page</div>
                            ) }
                            { isLoaded && (
                                <Autocomplete
                                    onLoad={onLoad}
                                    fields={['place_id']}
                                    onPlaceChanged={()=>onPlaceChanged}
                                >
                                    <Input
                                        name="companyName"                                               
                                        register={register}                
                                        value={company}
                                        handleChange={(e:any)=>setCompany(e.target.value)} 
                                        placeholder="Company Name"
                                        error={formState.errors.companyName?.message}
                                        wrapperClass={`form-group ${dstyles.mb_1}`}
                                        iconClass={`position-relative ${dstyles.input_business} ${dstyles.icon_wrap}`}
                                        className={`form-control ${dstyles.input_field} ${formState.errors.companyName ? dstyles.is_invalid : ''}`}         
                                    />
                                </Autocomplete> 
                            )}    
                        </div>
                    </div>
                    <p className={`text-center ${dstyles.text_lg}`}>Don’t see your business? <span className={`fw-bold ${dstyles.link}`} onClick={()=>setupManually()}>Enter it Manually.</span></p>
                </div>
            </div>
        </Form>
    </>)
}
export default ProfileSetup;