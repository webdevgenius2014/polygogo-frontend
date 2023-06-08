'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomeAccount(){
    return(
        <>
            <section className={`${styles.account}`}>
            <div className={`container ${styles.container}`}>
                    <div className={`${styles.fig}`}>
                        <h2 className={`mb-5 text-center ${styles.title} ${styles.col_white}`}>Create a free account.<br></br>Connect with customers easily.</h2>
                        <form>
                            <div className={`d-flex ${styles.newsletter_col}`}>
                                <input type='email' placeholder='Enter your email...' className={`form-control ${styles.news_field}`}/>
                                <button type='submit' className={`${styles.btn} ${styles.btn_tertiary} ${styles.btn_submit} mt-0`}><span className='fw-bold'>Start Free Trial</span><img src='icons/right_arrow.svg'/></button>
                                
                                </div>
                                <p>Free plan available. No credit card required.</p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}