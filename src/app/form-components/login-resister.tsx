'use client';
import React, { useEffect, useState } from 'react';
import Form from "./Form";
import Input from "./form-fields/Input";
import InputPassword from './form-fields/InputPassword';
import styles from '../../styles/styles.module.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'
import * as Yup from 'yup';


interface LoginRegisterInterface {
    emailOrPhone: string
    password: string    
}
type Props = {
    isShowPass?: boolean;
    setIsShowPass: (val: boolean) => void;    
    setIsOTPShow?:(val: boolean) => void;
};
const LoginRegisterForm : React.FC<Props> = ({ isShowPass=false, setIsShowPass, setIsOTPShow}) =>{ 
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
    const schema1 = Yup.object().shape({
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
    const schema2 = Yup.object().shape({            
        password: Yup.string()            
            .required('Please Enter your password')                        
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    });    
    const {
        register,    
        handleSubmit,    
        formState,    
        setError                
    } =  useForm<LoginRegisterInterface>(); 

    const onSubmit = (data: LoginRegisterInterface) => {
        console.log("hello i am here");
        console.log(data);        
        if(setIsOTPShow!==undefined){
            setIsOTPShow(true);
        }        
    };
    const handleSchema1Validation = async (data: LoginRegisterInterface) => {       
        try {
            await schema1.validate(data, { abortEarly: false });
            setIsShowPass(true);
        }catch (validationErrors) {
            if (validationErrors instanceof Yup.ValidationError) {
              validationErrors.inner.forEach((error:any) => {
                setError(error.path, { message: error.message });
              });
            }
        }
    };

    const handleSchema2Validation = async (data: LoginRegisterInterface) => { 
        console.log("hello11");       
        try {
        await schema2.validate(data, { abortEarly: false });
        onSubmit(data);
        }catch (validationErrors) {
            if (validationErrors instanceof Yup.ValidationError) {
              validationErrors.inner.forEach((error:any) => {
                setError(error.path, { message: error.message });
              });
            }
        }
    };
    // console.log(isShowPass);
    return(<>
        <Form     
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={isShowPass ? handleSchema2Validation : handleSchema1Validation}
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
            {isShowPass===true && <>
                <InputPassword 
                    name="password"
                    register={register}
                    placeholder="Password"
                    label="Password"
                    error={formState.errors.password?.message}
                    wrapperClass={`form-group mb-4 ${styles.input_lock} ${styles.icon_wrap}`}
                    className={`form-control ${styles.input_field} ${formState.errors.password ? 'is-invalid' : ''}`} 
                />                
                <div className='text-end'><Link href="/auth/forgot-password">Frogot Password?</Link></div> 
            </>} 
            <button type='submit' disabled={formState.isSubmitting} className={`mt-3 ${styles.btn} ${styles.btn_primary}`}>
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                <span>{isShowPass?'Sign Up':'Continue with email'}</span>
            </button>
        </Form>        
    </>);
};


export default LoginRegisterForm;
