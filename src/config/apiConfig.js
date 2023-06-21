const apiURL=process.env.NEXT_PUBLIC_API_URL+'/api/'

const ApiConfig = {
    'registerLogin' : `${apiURL}register`,
    'verifyOtp' : `${apiURL}verify-otp`,
    'socialLogin' : `${apiURL}social-login`,
    'userDetails': `${apiURL}user-details`,
    'completeProfile': `${apiURL}complete-profile`,
    'sendOtp': `${apiURL}send-otp`
};

export default ApiConfig;