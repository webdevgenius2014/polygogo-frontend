'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function(){
    return(
        <>
        <section className={`${styles.video_sec}`}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className={`${styles.video_left}`}>
                            <h2 className={`${styles.title}`}>Everything you need <span>to run a digital</span> business</h2>
                            <p>Turn all of your customer data into hyper-personalized messages that shoppers want—across email, SMS, push, and more.</p>
                        </div>
                    </div>
                    <div className='col-md-7'>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}