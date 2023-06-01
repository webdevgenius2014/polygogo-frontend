import React, { useEffect, useState } from "react";
// import { useBetween } from "use-between";
import Form from "./Form";
import Input from "./form-fields/Input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from '../styles/styles.module.scss'


// interface for form
interface LoginInterface {
    emailOrPhone: string;
}
type Props = { 
    userName:string;    
    setUserName:(val: string) => void;
    loginUser:(val: LoginInterface)=>void;        
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
            return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
        }
    )      
});

const LoginForm :React.FC<Props> = ({ userName, setUserName, loginUser}) =>{ 
    const {
        register, 
        handleSubmit,
        formState,    
        setError            
    } = useForm<LoginInterface>({resolver: yupResolver(validationSchema)});
    const handleChange=(e:any)=>{
        setUserName(e.target.value)
    }
    return (
        <Form     
            register={register}
            buttonLabel="Send Code"  
            handleSubmit={handleSubmit}     
            onSubmit={loginUser}
            formState={formState}
            className={styles.form}     
        >            
            <Input
                name="emailOrPhone"                                               
                register={register}
                value={userName}
                handleChange={(e:any)=>handleChange(e)} 
                placeholder="Email or Phone Number"
                error={formState.errors.emailOrPhone?.message}
                //label='Email or Phone Number'                    
                wrapperClass="form-group"
                iconClass={`position-relative ${styles.input_mail} ${styles.icon_wrap}`}
                className={`form-control ${styles.input_field} ${formState.errors.emailOrPhone ? styles.is_invalid : ''}`}         
            /> 
        </Form>
    );
};

export default LoginForm;
