import styles from '../styles/styles.module.scss'
import Image from 'next/image'
// type Props = {     
//     login:any; 
// };
const AppleLoginButton= () => {
    const loginWithApple = ()=>{
        console.log('login with apple');
    };
    return( 
        <button onClick={() => loginWithApple()} type='button' className={`d-block ms-auto me-auto ${styles.btn} ${styles.other_login}`}>
            <Image
            src="/apple.svg"
            width={20}
            height={24}
            alt="apple"                
            />           
            <span className='ms-3'>Login With Apple Store</span>
        </button>
    );
}
export default AppleLoginButton;