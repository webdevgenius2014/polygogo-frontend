import React, { FC, InputHTMLAttributes, useEffect } from "react";
import dstyles from '../../../../styles/dashboard/dstyles.module.scss'
interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
	
	name: string;
	placeholder:string;
	options:any;
	label?: string;
	register?: any;
	error?: any;		
	wrapperClass?: string;
	iconClass?:string
	handleChange?:any;
	inputClassName?: string;  
}

const Dropdown:React.FC<DropdownProps> = ({	
	name,
	placeholder,
	options,
	label,
	register,
	error,		
	wrapperClass,
	iconClass,
	handleChange,  
	...rest
}) => {
	const registerField = register(name);   
	return(
	<div className={wrapperClass}>
		{label && <label htmlFor={name} className={`${dstyles.label}`}>{label}</label>} 
		{iconClass? <div className={`${iconClass}`}>
			<select
				{...registerField} 
				onChange={e => {
					registerField.onChange(e);
					handleChange(e); 
			  	}}	
				{ ...rest }			
			>
				<option className="text-capitalize">{placeholder}</option>
				{options && options.map((option:any, index:any) => {
					return <option key={index} value={option.value}>{option.displayValue}</option>
				})}
			</select>
		</div>:
		<select
			{...registerField} 
			onChange={e => {
				registerField.onChange(e);
				handleChange(e); 
			}}	
			{ ...rest }	
		>
			<option className="text-capitalize">{placeholder}</option>	
			{options && options.map((option:any, index:any) => {
				return <option key={index} value={option.value}>{option.displayValue}</option>
			})}
		</select>}
	</div>)
}
export default Dropdown;