import React, { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./form-fields/Input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from '../styles/styles.module.scss'
// interface for form
interface VerifyCodeInterface {
    oneTimePassword: string;
}
const validationSchema = Yup.object().shape({            
    oneTimePassword: Yup.string().min(5, 'Code must be at least 5 characters').max(5, 'Invalid code').required('Please enter verification code'),
});
const VerifyCodeForm :React.FC=() =>{  
    const {
        register,        
        formState,
        handleSubmit,
        reset,
    } = useForm<VerifyCodeInterface>({resolver: yupResolver(validationSchema)}); 
   
    const onSubmit = (data: VerifyCodeInterface) => {

        console.log("hello i am here");
        console.log(formState.errors);
    };
    return (
        <Form     
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className={styles.form}     
        >
            <Input
                name="oneTimePassword"                                     
                register={register}
                placeholder="Enter Code"
                label="Enter Code"
                defaultValue='' 
                error={formState.errors.oneTimePassword?.message}                                      
                wrapperClass="form-group mb-4"
                className={`form-control ${styles.input_field} ${styles.input_code} ${formState.errors.oneTimePassword ? 'is-invalid' : ''}`}         
            />
            <button type='submit' disabled={formState.isSubmitting} className={`mt-3 ${styles.btn} ${styles.btn_primary}`}>
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                <span>Sign In</span>
            </button>  
        </Form>
    );
};

export default VerifyCodeForm;
