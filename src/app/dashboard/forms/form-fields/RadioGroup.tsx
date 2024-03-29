import React, { FC, InputHTMLAttributes, useEffect } from "react";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;  
  label?: string;
  error?: any;
  register?: any;
  options?:any; 
  wrapperClass?: string;
  iconClass?:string
  handleChange?:any;
  inputClassName?: string;
  currentValue?:string;  
}

const RadioGroup: FC<RadioGroupProps> = ({
  
  name,
  placeholder,
  label,
  error,
  register,  
  options,
  wrapperClass,
  iconClass,
  handleChange,
  currentValue,  
  ...rest
}) => { 
    const registerField = register(name);
    return(
        <div className={wrapperClass}>
            {label && <label htmlFor={name} className={`ms-3 ${dstyles.label}`}>{label}</label>}  
            <div className={dstyles.radio_group}>
                {options && options.map((option:any, index:any) => {                
                    return(
                        <label key={index} htmlFor={`field-${option.name}`} className={`${dstyles.radio_input}`}>
                            <input
                                {...registerField}
                                type="radio"
                                value={option.value}
                                id={`field-${option.name}`}                                
                                onChange={e => {
                                    registerField.onChange(e);
                                    handleChange && handleChange(e); 
                                }}  
                                checked={currentValue === option.value}                              
                                {...rest}
                            />
                            <span className={dstyles.radio_text}>{option.label}</span>
                        </label>
                    );
                })}
            </div>
            {error&& <p className={'text-danger mt-2 mb-1'}>{error}</p>}                   
        </div>
    );
}
export default RadioGroup;