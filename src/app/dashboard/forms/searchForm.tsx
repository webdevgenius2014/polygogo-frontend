import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
// interface for form
interface SearchInterface {
    searchText: string;
}
type Props = { 
    searchText:string;    
    setSearchText:(val: string) => void;
    searchValue:(val: SearchInterface)=>void;  
};
// validation
const validationSchema = Yup.object().shape({
    searchText: Yup.string().min(3, 'Enter search text').required('Please enter search text')         
});

const SearchForm :React.FC<Props> = ({ searchText, setSearchText, searchValue}) =>{    
    const[maxLength, setMaxLength]=useState(0);
    const {
        register,        
        handleSubmit,
        formState
    } = useForm<SearchInterface>({resolver: yupResolver(validationSchema)});
    
    const handleChange=(e:any)=>{
        setSearchText(e.target.value);
    }; 
    const registerField = register('searchText');      
    return (
        <form  
            onSubmit={handleSubmit(searchValue)} 
            className={`${dstyles.form} ${dstyles.search_form} `}
        > 
            <div className="form-group w-100 position-relative">
                <input                     
                    placeholder='Search'                  
                    aria-invalid={formState?.errors?.searchText ? "true" : "false"}                
                    {...registerField}
                    onChange={e => {
                        registerField.onChange(e);
                        handleChange(e); 
                    }}
                    className={`form-control w-100 ${dstyles.input_field}`}
                />
                <button type="submit" className={dstyles.search_btn}><img src="/dashboard/icons/search.svg" alt="search" /></button>
            </div>
        </form>
    );
};

export default SearchForm;
