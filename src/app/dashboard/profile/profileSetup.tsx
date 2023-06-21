import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useState, useEffect, useRef } from 'react';
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
const googleKey=process.env.NEXT_PUBLIC_GOOGLE_API_KEY; 
const scriptOptions= {
    googleMapsApiKey: googleKey,
    libraries: ['places'],
}
interface ProfileInterface {
    name: string;
    companyName:string;
}
type Props={
    currentStep:any;
    userData:any;
    setCurrentStep:(val:any)=>void;
    ismanual:boolean;
    name: any;
    company:any;
    setName: (val:any)=>void;
    setCompany: (val:any)=>void;
    companyDetails:any;
    setCompanyDetails: (val:any)=>void;
    googlePlaceId:string;
    setGooglePlaceId:(val:string)=>void;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;    
    setIsmanual:(val:boolean)=>void; 
    saveData: (val:any)=>void;  
    isDisabled:any; 
    message:any;
    alertClass: any;
    isloading:boolean;
};
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')    
});
const validationSchema1 = Yup.object().shape({});
const ProfileSetup: React.FC<Props>=({currentStep, setCurrentStep, prevStep, setSkip, ismanual, setIsmanual, name, company, setName, setCompany, companyDetails, setCompanyDetails, saveData, isDisabled, message, alertClass, setGooglePlaceId, googlePlaceId, isloading })=>{    
    const { isLoaded, loadError } = useLoadScript(scriptOptions);
    const [autocomplete, setAutocomplete] = useState(null);
    const inputRef = useRef<any | null>(null);         
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<ProfileInterface>({resolver: yupResolver(name.legth>0 ? validationSchema:validationSchema1)});
    const setupManually=()=>{        
        setIsmanual(true); 
        setCurrentStep(2);
        setSkip(null);  
    }  
    useEffect(()=>{
        if(ismanual===true){
            setSkip(null);
        }else{
            setSkip(currentStep+1);
        }
    },[ismanual]); 
    const onLoad = (autocompleteObj:any) => {       
        setAutocomplete(autocompleteObj);
    }   
    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            setCompany(place.name); 
            setGooglePlaceId(place?.place_id);         
            getAddressDetails(place); 
        } 
    }
    const getAddressDetails=(placeData:any)=>{             
        const city = placeData.address_components.filter((place:any) => {
            return place.types[0] === 'administrative_area_level_2' || place.types[0] === 'locality';
        });        
        const state = placeData.address_components.filter((place:any) => {
            return place.types[0] === 'administrative_area_level_1';
        });
        const zipcode = placeData.address_components.filter((place:any) => {
            return place.types[0] === 'postal_code';
        });       
        setCompanyDetails({
            company_name: placeData?.name, 
            address_one:  placeData?.address_components[0]?.long_name,
            address_two:  placeData?.address_components[1]?.long_name, 
            city: city[0]?.long_name,
            state:state[0]?.long_name,
            zipcode:zipcode[0]?.long_name, 
            resources_strength:'', 
            revanue:''
        });        
    }     
    const saveStepOneData=()=>{
        let payload = {
          name : name, 
          googlePlaceId : googlePlaceId, 
          ...companyDetails  
                 
        };  
        setIsmanual(false);
        setSkip(currentStep+1);          
        saveData(payload);
    }    
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Let’s start by Setting up your Profile.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}
            isDisabled={name.length>0 && !isDisabled ?false:true}
            onSubmit={saveStepOneData}
            isbackbutton={false}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
            isloading={isloading}
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
                                <StandaloneSearchBox
                                    onLoad={ref => inputRef.current = ref}
                                    onPlacesChanged={handlePlaceChanged}
                                >                                    
                                    <Input
                                        name="companyName" 
                                        type='text'                                              
                                        register={register}                
                                        value={company}
                                        handleChange={(e:any)=>setCompany(e.target.value)}                                         
                                        placeholder="Company Name"
                                        error={formState.errors.companyName?.message}
                                        wrapperClass={`form-group ${dstyles.mb_1}`}
                                        iconClass={`position-relative ${dstyles.input_business} ${dstyles.icon_wrap}`}
                                        className={`form-control ${dstyles.input_field} ${formState.errors.companyName ? dstyles.is_invalid : ''}`}         
                                    />
                                </StandaloneSearchBox>                                
                            )} 
                            {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p></div>}    
                        </div>
                    </div>
                    <div className={`text-center ${dstyles.text_lg}`}>Don’t see your business? <button type='button' disabled={name.length===0} className={`border-0 fw-bold text-black ${dstyles.btn_link}` } onClick={()=>setupManually()}>Enter it Manually.</button></div>
                </div>
            </div>
        </Form>
    </>)
}
export default ProfileSetup;