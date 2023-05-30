import React, { FC, InputHTMLAttributes } from "react";
import styles from '../../styles/styles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder:string;
  label?: string;
  error?: any;
  register?: any;
  wrapperClass?: string;
  handleChange?:any;
  inputClassName?: string;  
}

const Input: FC<InputProps> = ({
  register,
  name,
  placeholder,
  error,
  label,
  wrapperClass,
  handleChange,  
  ...rest
}) => {  
  const registerField = register(name);  
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={name} className={`${styles.label}`}>{label}</label>}      
      <input 
        placeholder={placeholder?placeholder:''}                   
        aria-invalid={error ? "true" : "false"}
        {...registerField}
        onChange={e => {
          registerField.onChange(e);
          handleChange(e); 
        }}
        {...rest}
      />      
      {error&& <p className={'text-danger mt-2'}>{error}</p>}
    </div>
  );
};

export default Input;
