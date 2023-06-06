'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomeBanner(){
    return(
        <>
            <section className={`${styles.banner}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <div className={`${styles.banner_left}`}>
                                <img src='images/banner_img.png' alt=''/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={`${styles.banner_right}`}>
                                <h1>The <span>Text Marketing tool</span> to grow your local business</h1>
                                <p>Manage all of your communication—from reviews to calls to text marketing, payments, and more—with Polygogo.</p>
                                
                                    <div className={`d-flex ${styles.upper} align-items-center`}>
                                        <form className={`d-flex ${styles.form_row}`}>
                                            <input type='email' placeholder='Enter your email...' className={`form-control ${styles.ban_field}`}/>
                                            <button type='submit' className={`${styles.btn} ${styles.btn_tertiary} ${styles.btn_submit} mt-0`}>Start Free Trial<img src='icons/right_arrow.svg'/></button>
                                        </form>
                                        <Link className={`${styles.site_link}`} 
                                            href="/">
                                                Get a Demo<img src='icons/right_arrow_white.svg'/>
                                            </Link>
                                    </div>
                                    <div className={`d-flex ${styles.feature_list}`}>
                                        <ul className={`d-flex ${styles.u_list}`}>
                                            <li>Free 7-day trial</li>
                                            <li>Easy setup</li>
                                            <li>Cancel any time</li>
                                        </ul>
                                    </div>
                            </div>
                            <div className={`${styles.review_sec}`}>
                                <div className={`${styles.customer_first}`}>
                                    <div><img src='images/customers.png' alt=''/></div>
                                    <div className={`${styles.cust_count}`}>
                                        <h5>2,291</h5>
                                        <p>Happy Customers</p>
                                    </div>
                                </div>
                                <div className={`${styles.ratings_sec}`}>
                                    <h5>4.8/5</h5>
                                    <p><img src="images/Stars.png"/>Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}