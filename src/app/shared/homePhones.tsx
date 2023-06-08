'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomePhones(){
    return(
        <>
             <section className={`${styles.campaign_sec}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-4'>
                            <div className={`${styles.space_left}`}>
                            <div className='mb-4'><img src='images/telephone.png' alt=''/></div>
                            <h4 className={`${styles.fig_heading}`}>Phones</h4>
                            <p className={`${styles.fig_desc}`}>Miss fewer calls and capture up to 10x more leads.</p>
                            <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                           
                                        </Link>
                           </div>
                           </div>         
                        
                        <div className='col-md-8'>
                            <div className={`${styles.camp_img} text-end`}>
                                <img src='images/phone_img.png' alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}