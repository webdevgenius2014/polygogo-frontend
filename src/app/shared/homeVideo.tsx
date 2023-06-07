'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function(){
    return(
        <>
        <section className={`${styles.video_sec}`}>
            <div className={`container ${styles.container}`}>
                <div className='row align-items-center'>
                    <div className={`col-md-4 ${styles.cust_left}`}>
                        <div className={`${styles.video_left}`}>
                            <h2 className={`${styles.title}`}>Everything you need <span>to run a digital</span> business</h2>
                            <p>Turn all of your customer data into hyper-personalized messages that shoppers want—across email, SMS, push, and more.</p>
                        </div>
                    </div>
                    <div className={`col-md-8 ${styles.cust_right}`}>
                        <div className={`${styles.video_right}`}>
                        <div className={`${styles.video_laptop}`}>
                        <video controls poster='images/YouTube-Thumbnail.png'>
                            <source src="videos/sample_video.mp4" type="video/mp4"/>
                        </video>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}