import React, { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./form-fields/Input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from '../../styles/styles.module.scss'
import { type } from "os";
// interface for form
interface VerifyCodeInterface {
    oneTimePassword: string;
}
type Props = {
    otp:string;
    buttonLabel:string,
    setOTP:(val:string)=>void
    submitCode:(val:VerifyCodeInterface)=>void;
    isloading:boolean;
}
const validationSchema = Yup.object().shape({            
    oneTimePassword: Yup.string().min(6, 'Please enter 6 digit code').max(6, 'Invalid code').required('Please enter verification code'),
});
const VerifyCodeForm :React.FC<Props>=({otp, buttonLabel, setOTP, submitCode, isloading}) =>{ 
    const {
        register, 
        handleSubmit,      
        formState,        
        reset,
    } = useForm<VerifyCodeInterface>({resolver: yupResolver(validationSchema)}); 

    const handleChange=(e:any)=>{
        setOTP(e.target.value)
    }
    return (
        <Form     
            register={register}            
            buttonLabel={buttonLabel}
            formState={formState}
            handleSubmit={handleSubmit}              
            onSubmit={submitCode}
            className={styles.form}    
            isloading={isloading} 
        >
            <Input
                name="oneTimePassword"                                               
                register={register}
                value={otp}
                handleChange={(e:any)=>{                    
                    handleChange(e)
                }} 
                placeholder="Enter Code"
                error={formState.errors.oneTimePassword?.message}
                //label='Email or Phone Number'
                maxLength={6}                     
                wrapperClass="form-group"
                iconClass={`position-relative ${styles.input_code} ${styles.icon_wrap}`}
                className={`form-control ${styles.input_field} ${formState.errors.oneTimePassword ? 'is-invalid' : ''}`}         
            />
        </Form>
    );
};

export default VerifyCodeForm;
