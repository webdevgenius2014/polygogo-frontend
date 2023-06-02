const apiURl=process.env.NEXT_PUBLIC_API_URL+'/api/'

const ApiConfig = {
    'registerLogin' : `${apiURl}register`,
    'verifyOtp' : `${apiURl}verify-otp`,
    'socialLogin' : `${apiURl}social-login`
};

export default ApiConfig;