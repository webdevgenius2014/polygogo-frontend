import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useEffect, useState } from 'react';
import { validateUserName, validateWebsiteUrl} from '../../../helpers/formatCheck';
interface BusinessWebsiteInterface {
    userName: string;
    businessUrl:string;
}
type Props={    
    currentStep:any;     
    userData:any;     
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;  
    setSkip:(val:any)=>void;
    userName:any; 
    setUserName:(val:any)=>void;
    businessUrl:any; 
    setBusinessUrl:(val:any)=>void;
    saveData:(val:any)=>void; 
    message:any; 
    alertClass: any;
    ismanual:any; 
    setIsVerified:(val:any)=>void;  
    isloading:boolean;
};
const validationSchema = Yup.object().shape({
    userName: Yup.string()
    .required('Username is required.')
    .min(8, 'Please enter minimum 8 characters.')
    .test('userName', 'Please enter a Valid username, no special character allowed.', (value) => {
        return validateUserName(value);
    }),
    businessUrl: Yup.string().required('Business url is required.').test("Please enter valid business url", (value)=>{
        return validateWebsiteUrl(value);
    })
});
const BusinessWebsite: React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData, userName, setUserName, businessUrl, setBusinessUrl, saveData, message, alertClass, ismanual, setIsVerified, isloading})=>{  
    const[prev, setperv] =useState(false);
    // const[next, setperv] =useState(false);
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<BusinessWebsiteInterface>({resolver: yupResolver(validationSchema)});
    
    useEffect(()=>{
        if(userData && userData.emailVerified===true && userData.phoneVerified===true){
            setIsVerified(true);
            setSkip(currentStep+1);
        }
    },[]);

    const saveBusinessWebsite=()=>{ 
        let payload={
            username: userName,
            bussiness_url:businessUrl
        }       
        saveData(payload);
    } 
    const back=()=>{
        setperv(true)
        if(ismanual===false){
            setSkip(currentStep-1);
        }
    }   
    const backToPrev=()=>{  
        prevStep(currentStep);
    };
    useEffect(()=>{        
        if(prev===true){
            setSkip(currentStep-1);
            backToPrev();
        }        
    },[prev])    
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Enter your Business Website Url</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}                 
            onSubmit={saveBusinessWebsite}
            onBack={back}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
            isloading={isloading}
        >
            <div className={`d-flex align-items-center justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.image_wrap}>
                    <img src="/dashboard/webpage-layout.png" alt="webpage-layout" />
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <h3 className={`${dstyles.title} ${dstyles.mx_362}`}>Enter Your User Name and <br className='d-none d-lg-block' />Unique Business Url</h3>                        
                        <div className={`${dstyles.mx_362}`}>                            
                            <Input
                                name="userName"                                               
                                register={register}                
                                value={userName}
                                handleChange={(e:any)=>setUserName(e.target.value)} 
                                placeholder="Name"
                                error={formState.errors.userName?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}                                
                                iconClass={`position-relative ${dstyles.input_user} ${dstyles.icon_wrap}`}
                                className={`form-control ${dstyles.input_field} ${formState.errors.userName ? dstyles.is_invalid : ''}`}         
                            /> 
                            <Input
                                name="businessUrl"                                               
                                register={register}                
                                value={businessUrl}
                                handleChange={(e:any)=>setBusinessUrl(e.target.value)} 
                                placeholder="Business Url"
                                error={formState.errors.businessUrl?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                iconClass={`position-relative ${dstyles.input_business} ${dstyles.icon_wrap}`}
                                className={`form-control ${dstyles.input_field} ${formState.errors.businessUrl ? dstyles.is_invalid : ''}`}         
                            />
                            {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p></div>} 
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </>)
}
export default BusinessWebsite;