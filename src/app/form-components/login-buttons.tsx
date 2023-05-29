
import styles from '../styles/styles.module.scss'
import Image from 'next/image'
export default function SocialMideiaLogin() {
  return(
    <> 
      <button type='button' className={`${styles.btn} ${styles.other_login}`}>
          <Image
            src="/google.svg"
            width={30}
            height={30}
            alt="google"                
          />
          <span className='ms-3'>Login with Google</span>
      </button>
      <button type='button' className={`${styles.btn} ${styles.other_login}`}>
          <Image
            src="/apple.svg"
            width={24}
            height={30}
            alt="apple"                
          />           
          <span className='ms-3'>Login with Google</span>
      </button>
  </>);
}