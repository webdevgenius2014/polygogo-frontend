import React, { FC, InputHTMLAttributes, useState } from "react";
import styles from '../../styles/styles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: any;
  register?: any;
  wrapperClass?: string;
  inputClassName?: string;
}

const InputPassword: FC<InputProps> = ({
    register,
    name,
    error,
    label,
    wrapperClass,    
    ...rest
}) => {
    console.log('console.log("hii i am here: '+name);
    const [ispassVisible, setIsPassVisible]=useState(false);
    const viewPassword=()=>{
        setIsPassVisible(!ispassVisible);
    }
    return (
        <div className={wrapperClass}>
            {label && <label htmlFor={name} className={`${styles.label}`}>{label}</label>}
            <div className='position-relative'>     
                <input
                    type={ispassVisible?"text":"password"}
                    aria-invalid={error ? "true" : "false"}
                    {...register(name)}
                    {...rest}
                />
                {ispassVisible?(
                    <span className={styles.pass_eye} onClick={()=>viewPassword()}><img src="/icons/eye.svg" alt="eye" width="23" /></span>
                ):(
                    <span className={styles.pass_eye} onClick={()=>viewPassword()}>  <img src="/icons/eye-slash.svg" alt="eye" width="23" /></span>                            
                )}
            </div> 
            {error&& <p className={'text-danger mt-2'}>{error}</p>}
        </div>
    );
};

export default InputPassword;
