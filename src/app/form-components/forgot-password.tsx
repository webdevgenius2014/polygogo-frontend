import React, { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./form-fields/Input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from '../styles/styles.module.scss'
// interface for form
interface ForgotPasswordInterface {
    emailOrPhone: string;
    code: string;
}
type Props = {    
    setIsOTPShow: (val: boolean) => void;    
};
// validation
const validateEmail = (email: string | undefined) => {        
    var isValid = false;       
    if(email){
        isValid= Yup.string().email().isValidSync(email);
    }
    return isValid;
};     
const validatePhone = (phone: number | undefined) => {
    return Yup.number().integer().positive().test(
       (phone) => {
         return (phone && phone.toString().length >= 8 && phone.toString().length <= 14) ? true : false;
       }
     ).isValidSync(phone);
};
const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email / Phone is required')
        .test('emailOrPhone', 'Email / Phone is invalid', (value) => { 
            // if(validateEmail(value)===true || validatePhone(parseInt(value ?? '0'))===true){
            //     setIsShowPass(true);
            // }
            return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
        }
    )      
});
// const schema2 = Yup.object().shape({            
//     code: Yup.string().min(4).max(6).required('Please enter verification code'),
// });

const ForgotPasswordForm :React.FC<Props> = ({ setIsOTPShow }) =>{  
  const {
    register,    
    handleSubmit,    
    formState,    
    setError            
  } = useForm<ForgotPasswordInterface>({resolver: yupResolver(validationSchema)});     
    const onSubmit = (data: ForgotPasswordInterface) => {
        console.log("hello i am here");
        console.log(data);
        setIsOTPShow(true)
    };
    return (
        <Form     
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className={styles.form}     
        >            
            <Input
                name="emailOrPhone"                                     
                register={register}
                placeholder="Email or mobile number"
                error={formState.errors.emailOrPhone?.message}
                label='Email or Phone Number'                    
                wrapperClass="form-group mb-4"
                className={`form-control ${styles.input_field} ${styles.input_mail} ${formState.errors.emailOrPhone ? 'is-invalid' : ''}`}         
            />            
            <button type='submit' disabled={formState.isSubmitting} className={`mt-3 ${styles.btn} ${styles.btn_primary}`}>
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                <span>Send Code</span>
            </button>  
        </Form>
    );
};

export default ForgotPasswordForm;
