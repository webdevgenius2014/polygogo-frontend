'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomeMessaging(){
    return(
        <>
            <section className={`${styles.messaging_sec}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-8'>
                            <div className={`${styles.camp_img}`}>
                                <img src='images/ggh.png' alt=''/>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className={`${styles.space_left}`}>
                            <div className='mb-4'><img src='images/chat.png' alt=''/></div>
                            <h4 className={`${styles.fig_heading}`}>Messaging</h4>
                            <p className={`${styles.fig_desc}`}>Connect with customers easily through text message and other channels.</p>
                            <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                        </Link>
                           </div>
                           </div>
                    </div>
                </div>
            </section>
        </>
    )
}
