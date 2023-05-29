import React, { FC, InputHTMLAttributes } from "react";
import styles from '../../styles/styles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder:string;
  label?: string;
  error?: any;
  register?: any;
  wrapperClass?: string;
  inputClassName?: string;  
}

const Input: FC<InputProps> = ({
  register,
  name,
  placeholder,
  error,
  label,
  wrapperClass,  
  ...rest
}) => {
  console.log("hii i am here"+name);
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={name} className={`${styles.label}`}>{label}</label>}      
      <input 
        placeholder={placeholder?placeholder:''}                   
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...rest}
      />      
      {error&& <p className={'text-danger mt-2'}>{error}</p>}
    </div>
  );
};

export default Input;
