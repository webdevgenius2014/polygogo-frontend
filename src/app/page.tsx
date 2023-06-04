'use client'
import Image from 'next/image'
import styles from '../styles/styles.module.scss'
import { useAuth } from './middleware/middleware'
import AuthService from '../services/auth.service'
import { useRouter } from 'next/navigation';
export default function Home() {  
  //useAuth();

  const router = useRouter();
  const logoutUser=()=>{
    AuthService.logout();
    router.push('/login');
  }
  return (
    <main className={` ${styles.main} ${styles.container} ${styles.bg_light}`}>
      <div className='p-4 w-100'>
        <div className={`p-4 mb-4 d-flex align-items-center justify-space-between`}>
          <div className={styles.title_image}>
            <Image
              src="/PolygogoBlack.png"
              width={176}
              height={35}
              alt="Poly go go Black"                
            />
          </div>
          {sessionStorage.getItem("auth_token") ? 
          <button type='button' className={`ms-auto w-auto ${styles.btn} ${styles.btn_secondary}`} onClick={()=>logoutUser()}>
            <span className='fw-bold'>Logout</span>
            {/* <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" /> */}
          </button>
          :<div className={`ms-auto w-auto`}>
            <button 
            type='button' 
            className={`${styles.btn} ${styles.btn_secondary}`} 
            onClick={()=>router.push('/login')}>
              <span className='fw-bold'>Login</span>
              {/* <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" /> */}
            </button> 
            <button 
            type='button' 
            className={`${styles.btn} ${styles.btn_secondary}`} 
            onClick={()=>router.push('/register')}>
              <span className='fw-bold'>Start a free trial</span>
              {/* <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" /> */}
            </button>
          </div>
          }
        </div>
        <div className='text-center pt-5 mt-5'>
          <h1 className={styles.text_primary}>Hello,  Welcome to Poly Go GO!</h1>
        </div> 
      </div>     
    </main>
  )
}
