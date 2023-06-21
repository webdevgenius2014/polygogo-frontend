import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
import { useForm } from "react-hook-form";
import Form from '../../forms/Form';
import { useEffect, useRef } from 'react';
import { validateOtpDigit, validateEmail } from "../../../../helpers/formatCheck"
interface VerifyCodeInterface {    
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
    verifyCode :(val:any)=>void; 
    getCode :(val:any)=>void; 
    isResend:boolean;
    message:any;
    alertClass:any;
    updateMobile:(val:any)=>void;
    otpDigits:any; 
    setOtpDigits:(val:any)=>void;
    isloading:boolean;
};
const VerifyCode: React.FC<Props>=({currentStep, prevStep, isDisabled, verifyOtp, setVerifyOtp, verifyCode, verifyName, getCode, isResend, updateMobile, message, alertClass, otpDigits, setOtpDigits, isloading})=>{
    const {
        register,        
        handleSubmit,
        formState,       
    } = useForm<VerifyCodeInterface>();
      
    const digitOne = useRef<HTMLInputElement | null>(null);
    const digitTwo = useRef<HTMLInputElement | null>(null);
    const digitThree = useRef<HTMLInputElement | null>(null);
    const digitFour = useRef<HTMLInputElement | null>(null);
    const digitFive = useRef<HTMLInputElement | null>(null);
    const digitSix = useRef<HTMLInputElement | null>(null);
    const handleDigits=(id:any, val:any)=>{        
        const currentDigit= validateOtpDigit(val);
        if(currentDigit){
            let el = otpDigits.map((item:any) => {if(item.id === id){item.digit=val} return  item});
            setOtpDigits(el);
        }
    }
    useEffect(()=>{
        digitOne?.current?.focus();
    },[])
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
    
    const autoFocus=(nextRef:any)=>{         
        nextRef?.current?.focus();        
    }
    const verifyOTP=()=>{
        if(verifyOtp.length===6){           
            let payload = {
                username:(validateEmail(verifyName))?verifyName:verifyName.replace(/\D/g, ''),
                otp: verifyOtp
            }                  
            verifyCode(payload);
        }
    }  
    const resendOtp=()=>{
        let payload = {
            username:(validateEmail(verifyName))?verifyName:verifyName.replace(/\D/g, ''),            
        }
        getCode(payload);
    } 
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Perfect! We Just Texted you a Code.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={verifyOTP}
            isDisabled={isDisabled}
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
                <div className={`h-100 d-flex flex-column ${dstyles.form_wrap} ${dstyles.after_before_dots} ${dstyles.justify_between}`}>
                    <div className={`${dstyles.mx_362}`}>
                        <h3 className={dstyles.title}>We sent a 4-digit code to <br className='d-none d-lg-block' /> {verifyName}. Enter the code to continue setting up.</h3>
                        <div className={dstyles.otp_group}>
                            <input 
                                name="digitOne"                                     
                                id="digitOne" 
                                ref={digitOne}
                                value={otpDigits[0]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(1, e.target.value);  
                                    autoFocus(digitTwo)                                  
                                }}                                                         
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[0]?.digit) ? dstyles.is_invalid : ''}`}
                            />
                            <input 
                                name="digitTwo"  
                                id="digitTwo"  
                                ref={digitTwo}
                                value={otpDigits[1]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(2, e.target.value);
                                    autoFocus(digitThree)
                                }}                                                          
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[1]?.digit) ? dstyles.is_invalid : ''}`}                                 
                            />
                            <input 
                                name="digitThree"  
                                id="digitThree"  
                                ref={digitThree}
                                value={otpDigits[2]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(3, e.target.value);
                                    autoFocus(digitFour)
                                }}                                                            
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[2]?.digit) ? dstyles.is_invalid : ''}`}
                            />
                            <input 
                                name="digitFour"  
                                id="digitFour"  
                                ref={digitFour}
                                value={otpDigits[3]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(4, e.target.value);
                                    autoFocus(digitFive)
                                }}                                                              
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[3]?.digit) ? dstyles.is_invalid : ''}`}                                
                            />
                            <input 
                                name="digitFive"  
                                id="digitFive"  
                                ref={digitFive}
                                value={otpDigits[4]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(5, e.target.value);
                                    autoFocus(digitSix)
                                }}                                                            
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[4]?.digit) ? dstyles.is_invalid : ''}`}                               
                            />
                            <input 
                                name="digitSix"  
                                id="digitSix"  
                                ref={digitSix}
                                value={otpDigits[5]?.digit}
                                maxLength={1}
                                onChange={(e)=>{
                                    handleDigits(6, e.target.value);
                                    autoFocus(digitThree)
                                }}                          
                                className={`form-control ${dstyles.otp_field} ${validateOtpDigit(otpDigits[5]?.digit) ? dstyles.is_invalid : ''}`}
                            />                            
                        </div>                         
                        {verifyOtp.length!==6 && <p className={'text-center text-danger mt-2 mb-1'}> Please enter 6 digit valid otp.</p>}                                                     
                    </div>
                    {isResend && 
                        <p className={`text-center ${dstyles.mx_362} mt-2 mb-2`}>Didn'’'t get the code? <span onClick={()=>resendOtp()} className={`fw-bold ${dstyles.link}`}>Resend</span> or Update your<span onClick={updateMobile} className={`fw-bold ${dstyles.link}`}> mobile number</span></p>
                    }
                    {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p></div>}                     
                </div>
            </div>
        </Form>
    </>)
}
export default VerifyCode;