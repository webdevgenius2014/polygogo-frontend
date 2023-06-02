import * as Yup from "yup";

export const validateEmail = (email: string | undefined) => {  
    var isValid = false;       
    if(email){
        isValid= Yup.string().email().isValidSync(email);
    }
    return isValid;
}; 
export const testPhone=(value:any)=>{
    var regex=/[0-9]+/;
    if(regex.test(value)){
        return true;
    }
} 
export const validatePhone = (phone: string | undefined) => {     
    if(phone){
        return (phone && phone.length === 10 ? true : false);
    } 
    return false; 
};
