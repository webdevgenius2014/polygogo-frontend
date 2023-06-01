
import styles from '../styles/styles.module.scss'
import Image from 'next/image'
export default function SocialMideiaLogin() {
  return(
    <> 
      <button type='button' className={`${styles.btn} ${styles.other_login}`}>
          <Image
            src="/google.svg"
            width={20}
            height={21}
            alt="google"                
          />
          <span className='ms-3'>Login with Google</span>
      </button>
      <button type='button' className={`${styles.btn} ${styles.other_login}`}>
          <Image
            src="/apple.svg"
            width={20}
            height={24}
            alt="apple"                
          />           
          <span className='ms-3'>Login With Apple Store</span>
      </button>
  </>);
}