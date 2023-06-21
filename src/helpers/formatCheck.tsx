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
export const validateOTP= (otp: string | undefined) => {  
    return (otp && otp.length === 6 ? true : false);
};
export const validateUserName=(username: any | undefined) =>{   
    var regex=/^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    return(username && regex.test(username) && username.length >=8? true: false);
    
}
export const validateWebsiteUrl=(url: any | undefined)=>{
    const regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
    return(url && regex.test(url)? true: false);
}

export const validateOtpDigit=(digit: any | undefined)=>{
    const regex= /^[0-9]*$/
    return( digit && digit.length===1 && regex.test(digit)?true:false);
}