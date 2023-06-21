import React, { FC, InputHTMLAttributes, useEffect } from "react";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
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

const FileInput: FC<FileInputProps> = ({
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
    <div className={`position-relative ${wrapperClass}`}>
      <label htmlFor={name} className="d-flex align-items-center justify-content-center">
        <img src="/dashboard/icons/upload.svg" alt="upload" className={`me-1 ${dstyles.upload_img}`} /><span className={dstyles.upload_label}>{label}</span>  
      </label>    
      <input 
        id={name}              
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
      {error&& <p className={'text-danger mt-2 mb-1'}>{error}</p>}
    </div>
  );
};

export default FileInput;
