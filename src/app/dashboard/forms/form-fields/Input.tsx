import React, { FC, InputHTMLAttributes, useEffect } from "react";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder:string;
  label?: string;
  error?: any;
  register?: any;
  maxLength?:number;
  wrapperClass?: string;
  iconClass?:string
  handleChange?:any;
  inputClassName?: string;  
}

const Input: FC<InputProps> = ({
  register,
  name,
  placeholder,
  error,
  label,
  maxLength,
  wrapperClass,
  iconClass,
  handleChange,  
  ...rest
}) => {  
  const registerField = register(name);   
  
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={name} className={`${dstyles.label}`}>{label}</label>}  
      {iconClass? <div className={`${iconClass}`}>
        <input 
          placeholder={placeholder?placeholder:''}                   
          aria-invalid={error ? "true" : "false"}
          maxLength={maxLength?maxLength:''}
          {...registerField}
          onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
          }}
          {...rest}
        />
      </div>:<>
        <input 
          placeholder={placeholder?placeholder:''}                   
          aria-invalid={error ? "true" : "false"}
          maxLength={maxLength?maxLength:''}
          {...registerField}
          onChange={e => {
            registerField.onChange(e);
            handleChange && handleChange(e); 
          }}
          {...rest}
        />
      </>} 
      {error&& <p className={'text-danger mt-2 mb-1'}>{error}</p>}
    </div>
  );
};

export default Input;
