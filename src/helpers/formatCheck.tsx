import * as Yup from "yup";

export const validateEmail = (email: string | undefined) => {  
    var isValid = false;       
    if(email){
        isValid= Yup.string().email().isValidSync(email);
    }
    return isValid;
}; 
export const testPhone=(value:any)=>{
    var regex=/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return regex.test(value)
} 
export const validatePhone = (phone: string | undefined) => {     
    return (phone && phone.length === 10 ? true : false);
};
