import React, { FC, InputHTMLAttributes, useEffect } from "react";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
interface OtpInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  reference: any; 
}
const OtpInput: FC<OtpInputProps> = ({
  register,
  name,
  placeholder,
  error,
  label,
  maxLength,
  wrapperClass,
  iconClass,
  handleChange, 
  reference, 
  ...rest  
}) => {  
  const registerField = register(name, {ref: reference});   
  return (<>    
    <input 
      placeholder={placeholder?placeholder:''}                   
      aria-invalid={error ? "true" : "false"}
      maxLength={maxLength?maxLength:1}
      {...registerField}      
      onChange={e => {        
        registerField.onChange(e);
        handleChange && handleChange(e); 
      }}
      {...rest}
    />
  </>);
};

export default OtpInput;
