'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
export default function HomeMarketing(){
    return(
        <>
            <section className={`${styles.marketing}`}>
            <h2 className={`text-center ${styles.title} mb-5`}>The <span>Marketing and Communication</span><br></br> Platform for Local Businesses</h2>
                <div className={`container ${styles.container}`}>
                    <div className={`${styles.back_row} ${styles.one}`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                        <div className='col-md-8'>
                            <div className={`${styles.fig_img}`}>
                                <img src='images/bbb.png' alt=''/>
                            </div>
                        </div>
                        <div className='col-md-4'>
                        <div className={`${styles.fig_text}`}>
                            <div className='mb-4'><img src='images/review-icon.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Reviews</h4>
                                <p className={`${styles.fig_desc}`}>Drive more reviews and website traffic.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.back_row} ${styles.two} mt-3`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                    <div className='col-md-4'>
                        <div className={`${styles.fig_text} ${styles.space_left}`}>
                            <div className='mb-4'><img src='images/conversation.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Chat</h4>
                                <p className={`${styles.fig_desc}`}>Turn more website visitors into leads and repeat customers.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </div>
                        </div>
                        <div className='col-md-8 text-end'>
                            <div className={`${styles.fig_img}`}>
                                <img src='images/chat_ig.png' alt=''/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className={`${styles.back_row} ${styles.one} mt-3`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                        <div className='col-md-8'>
                            <div className={`${styles.fig_img}`}>
                                <img src='images/payment_ig.png' alt=''/>
                            </div>
                        </div>
                        <div className='col-md-4'>
                        <div className={`${styles.fig_text}`}>
                            <div className='mb-4'><img src='images/operation.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Payments</h4>
                                <p className={`${styles.fig_desc}`}>Make paying you quick and convenient with text-to-pay and eCard readers.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </section>
        </>
    )
}

