import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../forms/Form';
import Input from '../../forms/form-fields/Input';
import OtpInput from '../../forms/form-fields/otpInput'
import { useState, useEffect } from 'react';
import { validateOtpDigit } from "../../../../helpers/formatCheck";
interface VerifyCodeInterface {
    oneTimePassword: string;
    digitOne:any; 
    digitTwo:any;  
    digitThree:any;  
    digitFour:any;  
    digitFive:any;  
    digitSix:any;      
}
type Props={
    verifyName: any;
    verifyOtp:any;
    currentStep:any;
    isDisabled:boolean;  
    prevStep:(val:any)=>void;
    setVerifyOtp:(val:any)=>void;
    verifyCode :(val:VerifyCodeInterface)=>void; 
    getCode :(val:any)=>void; 
    isResend:boolean;
    updateMobile:(val:any)=>void;
};
const validationSchema = Yup.object().shape({  
    digitOne:Yup.string().min(1).max(1).required(),
    digitTwo:Yup.string().min(1).max(1).required(),
    digitThree:Yup.string().min(1).max(1).required(),
    digitFour:Yup.string().min(1).max(1).required(),
    digitFive:Yup.string().min(1).max(1).required(),
    digitSix:Yup.string().min(1).max(1).required()
});
const VerifyCode: React.FC<Props>=({currentStep, prevStep, isDisabled, verifyOtp, setVerifyOtp, verifyCode, verifyName, getCode, isResend, updateMobile})=>{
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<VerifyCodeInterface>({resolver: yupResolver(validationSchema)});
    const digits = [{ id: 1, digit: '' },{ id: 2, digit: '' },{ id: 3, digit: '' },{ id: 4, digit: '' },{ id: 5, digit: '' },{ id: 6, digit: '' }];
    const [otpDigits, setOtpDigits]=useState(digits);
      
    const handleDigits=(id:any, val:any)=>{        
        const currentDigit= validateOtpDigit(val);
        if(currentDigit){
            let el = otpDigits.map((item) => {if(item.id === id){item.digit=val} return  item});
            setOtpDigits(el);
        }
    }
    useEffect(()=>{        
        const setOtpVal=(list:any)=>{
            let otp='';
            list.map((data:any)=>{
                if(verifyOtp.length<=6){
                    otp = otp + data.digit
                }else{                   
                    setVerifyOtp('');
                }                
            })
            setVerifyOtp(otp);
        }
        setOtpVal(otpDigits);
    },[otpDigits]);
    console.log(verifyOtp);
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Perfect! We Just Texted you a Code.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={verifyCode}
            isDisabled={isDisabled}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.image_wrap}>
                    <img src="/dashboard/my-profile.png" alt="my-profile" />
                </div>
                <div className={`h-100 d-flex flex-column ${dstyles.form_wrap} ${dstyles.after_before_dots} ${dstyles.justify_between}`}>
                    <div className={`${dstyles.mx_362}`}>
                        <h3 className={dstyles.title}>We sent a 4-digit code to <br className='d-none d-lg-block' /> {verifyName}. Enter the code to continue setting up.</h3>
                        <div className={dstyles.otp_group}>
                            <OtpInput
                                name="digitOne"                                               
                                register={register}                                                
                                value={otpDigits[0].digit}                               
                                handleChange={(e:any)=>{handleDigits(1, e.target.value,)}} 
                                placeholder=""
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[0].digit) ? dstyles.is_invalid : ''}`}         
                            />
                            <OtpInput
                                name="digitTwo"                                               
                                register={register}                                                
                                value={otpDigits[1].digit}                               
                                handleChange={(e:any)=>{handleDigits(2, e.target.value)}} 
                                placeholder=""
                                disabled={otpDigits[0].digit?false:true}  
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[1].digit) ? dstyles.is_invalid : ''}`}   
                            />
                            <OtpInput
                                name="digitThree"                                               
                                register={register}                                                
                                value={otpDigits[2].digit}                               
                                handleChange={(e:any)=>{handleDigits(3, e.target.value)}} 
                                placeholder=""
                                disabled={otpDigits[1].digit?false:true} 
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[2].digit) ? dstyles.is_invalid : ''}`}  
                            />
                            <OtpInput
                                name="digitFour"                                               
                                register={register}                                                
                                value={otpDigits[3].digit}                               
                                handleChange={(e:any)=>{handleDigits(4, e.target.value)}} 
                                placeholder=""
                                disabled={otpDigits[2].digit?false:true}
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[3].digit) ? dstyles.is_invalid : ''}`} 
                            />
                            <OtpInput
                                name="digitFive"                                               
                                register={register}                                                
                                value={otpDigits[4].digit}                               
                                handleChange={(e:any)=>{handleDigits(5, e.target.value)}} 
                                placeholder=""
                                disabled={otpDigits[3].digit?false:true}
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[4].digit) ? dstyles.is_invalid : ''}`} 
                            />
                            <OtpInput
                                name="digitSix"                                               
                                register={register}                                                
                                value={otpDigits[5].digit}                               
                                handleChange={(e:any)=>{handleDigits(6, e.target.value)}} 
                                placeholder=""
                                disabled={otpDigits[4].digit?false:true}
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[5].digit) ? dstyles.is_invalid : ''}`}  
                            />
                        </div> 
                        {(formState.errors?.digitOne || formState.errors?.digitTwo || formState.errors?.digitThree || formState.errors?.digitFour || formState.errors?.digitFive || formState.errors?.digitSix) 
                            && <p className={'text-danger mt-2 mb-1'}> Please enter 6 digit valid otp.</p>
                        }                                                      
                    </div>
                    {isResend && 
                        <p className={`text-center ${dstyles.mx_362}`}>Didn'’'t get the code? <span onClick={()=>getCode} className={`fw-bold ${dstyles.link}`}>Resend</span> or Update your<span onClick={()=>updateMobile} className={`fw-bold ${dstyles.link}`}> mobile number</span></p>
                    } 
                </div>
            </div>
        </Form>
    </>)
}
export default VerifyCode;