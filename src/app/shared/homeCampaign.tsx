'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomeCampaign(){
    return(
        <>
            <section className={`${styles.campaign_sec}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-4'>
                            <div className={`${styles.space_left}`}>
                            <div className='mb-4'><img src='images/megaphone.png' alt=''/></div>
                            <h4 className={`${styles.fig_heading}`}>Text Campaigns</h4>
                            <p className={`${styles.fig_desc}`}>Send text campaigns that get opened 98% of the time.</p>
                            <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                           
                                        </Link>
                           </div>
                           </div>         
                        
                        <div className='col-md-8'>
                            <div className={`${styles.camp_img} text-end`}>
                                <img src='images/campaign_img.png' alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}