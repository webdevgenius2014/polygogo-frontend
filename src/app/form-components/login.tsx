import React, { useEffect, useState } from "react";
// import { useBetween } from "use-between";
import Form from "./Form";
import Input from "./form-fields/Input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from '../../styles/styles.module.scss'
import { validateEmail, validatePhone, testPhone } from "../../helpers/formatCheck";

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
const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email / Phone is required')
        .test('emailOrPhone', 'Email / Phone is invalid', (value) => {
            return validateEmail(value) || validatePhone(value.replace(/\D/g, ''));
        }
    )      
});

const LoginForm :React.FC<Props> = ({ userName, setUserName, loginUser}) =>{ 
    const[inputClass, setInputClass]=useState(styles.input_mail);
    const[maxLength, setMaxLength]=useState(0);
    const {
        register,        
        handleSubmit,
        formState,    
        setError, 
        setValue,            
    } = useForm<LoginInterface>({resolver: yupResolver(validationSchema)});
    
    const handleChange=(e:any)=>{
        setUserName(e.target.value);
        if(testPhone(e.target.value)===true){
            if(e.target.value.length>=3){
                setMaxLength(10);
                setInputClass(styles.input_call); 
                var phone=e.target.value;               
                setUserName(phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)-$2-$3")); 
            }
        }else{
            setInputClass(styles.input_mail);
            setMaxLength(0);
        }       
    };   
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
                maxLength={maxLength?maxLength:0}                   
                wrapperClass="form-group"
                iconClass={`position-relative ${userName?inputClass:styles.input_mail} ${styles.icon_wrap}`}
                className={`form-control ${styles.input_field} ${formState.errors.emailOrPhone ? styles.is_invalid : ''}`}         
            /> 
        </Form>
    );
};

export default LoginForm;
