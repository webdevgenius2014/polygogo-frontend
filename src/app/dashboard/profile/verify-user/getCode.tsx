import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../forms/Form';
import Input from '../../forms/form-fields/Input';
import { useState, useEffect } from 'react';
import { validateEmail, validatePhone, testPhone} from "../../../../helpers/formatCheck";
interface GetCodeInterface {
    emailOrPhone: string;
}
type Props={
    currentStep:any; 
    verifyName: any;
    isDisabled:boolean;
    setVerifyName: (val:any)=>void;
    getCode :(val:GetCodeInterface)=>void;   
    prevStep:(val:any)=>void;
    userData:any;
};
const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email / Phone is required')
        .test('emailOrPhone', 'Email / Phone is invalid', (value) => {
            return validateEmail(value) || validatePhone(value.replace(/\D/g, ''));
        }
    )   
});
const validateEmailVal = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email is required')
        .test('emailOrPhone', 'Email is invalid', (value) => {
            return validateEmail(value) || validatePhone(value.replace(/\D/g, ''));
        }
    )   
});
const validatePhoneVal = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Phone number is required')
        .test('emailOrPhone', 'Phone number is invalid', (value) => {
            return  validatePhone(value.replace(/\D/g, ''));
        }
    )   
});
const GetCode: React.FC<Props>=({verifyName, setVerifyName, getCode, prevStep, currentStep, isDisabled, userData})=>{   
    const[maxLength, setMaxLength]=useState(0);   
    const isEmailVerified=userData.emailVerified;
    const isPhoneVerified=userData.phoneVerified; 
    console.log(userData);
    const userEmail="test@gmail.com";
    const userPhone="";    
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<GetCodeInterface>({resolver: yupResolver(!isEmailVerified?validateEmailVal:!isPhoneVerified?validatePhoneVal:validationSchema)});

    const handleChange=(val:any)=>{
        setVerifyName(val);
        if(testPhone(val)===true){
            if(val>=3){
                setMaxLength(10);               
                var phone=val;               
                setVerifyName(phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)-$2-$3")); 
            }
        }else{            
            setMaxLength(0);
        }       
    }; 
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Make your Website Textable.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}           
            isDisabled={isDisabled}     
            onSubmit={getCode}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}            
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                
                <div className={dstyles.box_image_wrap} style={{ height:"27.93rem" }}>
                    <div className='position-relative h-100 w-100'>
                    <div className={`mw-100 ${dstyles.img_one}`}>
                        <div className={`mw-100 position-relative`}>
                            <img
                                src={`/dashboard/verify-email.png`}
                                alt="verify-email"
                                style={{height:'20rem' }}   
                                className="mw-100"                                
                            />
                            {isEmailVerified && userData.emailVerified===true && <span className={`${dstyles.d_text} ${dstyles.email_text}`} >{userData.emailVerified===true?userData.email:''}</span>}
                            {!isEmailVerified && validateEmail(verifyName) &&  <span className={`${dstyles.d_text} ${dstyles.email_text}`} >{verifyName}</span>}                       
                        </div>                    
                    </div>
                    <div className={`mw-100 ${dstyles.img_two}`}>
                        <div className={`mw-100 position-relative`}>                
                            <img
                                src={`/dashboard/verify-phone.png`}
                                alt="verify-phone"                    
                                style={{height: "12.813rem" }}                   
                                className={`mw-100`} 
                            />
                            { isPhoneVerified && userData.phoneVerified===true && <span className={`${dstyles.d_text} ${dstyles.phone_text}`} >{userData.phoneVerified===true?userData.phone:''}</span>}
                            {!isPhoneVerified && validatePhone(verifyName && verifyName.replace(/\D/g, '')) && <span className={`${dstyles.d_text} ${dstyles.phone_text}`} >{verifyName}</span>}
                        </div>
                    </div>                  
                    </div>
                    <img
                    src={`/dashboard/arrow-indicate.png`}
                    alt="arrow-indicate"
                    style={{height: "" }} 
                    className={`mw-100 ${dstyles.connect_arrow}`}                                
                    />
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <h3 className={dstyles.title}>Verify your email or <br className='d-none d-lg-block' /> phone number</h3>
                        <div className={`${dstyles.mx_362}`}>
                            <Input
                                name="emailOrPhone"                                               
                                register={register}                                                
                                value={verifyName}                               
                                handleChange={(e:any)=>{handleChange(e.target.value)}} 
                                placeholder={!isEmailVerified?'Email':!isPhoneVerified?'Phone Number':"Email or Phone Number"}
                                error={formState.errors.emailOrPhone?.message}
                                maxLength={maxLength?maxLength:0} 
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                // iconClass={`position-relative ${dstyles.input_user} ${dstyles.icon_wrap}`}
                                className={`form-control ${dstyles.input_field} ${formState.errors.emailOrPhone ? dstyles.is_invalid : ''}`} 
                                iconClass={`position-relative ${!isPhoneVerified?dstyles.input_call:!isEmailVerified?dstyles.input_mail:dstyles.input_mail} ${dstyles.icon_wrap}`}
                            /> 
                            
                            <button type='submit' disabled={formState && formState.isSubmitting} className={`w-100 ${dstyles.btn} ${dstyles.next_btn} ${dstyles.btn_primary}`}>
                                {formState && formState.isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
                                <span className="fw-bold">Send Code</span>
                                <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </>)
}
export default GetCode;