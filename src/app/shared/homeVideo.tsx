'use client'
import { browser } from 'process';
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import { access } from 'fs';
import { motion, spring } from "framer-motion";
const fromLeft = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };
  const fromRight = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

export default function HomeVideo(){
    return(
        <>
        <section className={`${styles.video_sec}`}>
            <div className={`container ${styles.container}`}>
                <div className='row align-items-center'>
                    <motion.div className={`col-md-4 ${styles.cust_left}`}
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <div className={`${styles.video_left}`}>
                          <div>
                            <img src='images/house_icon.png' alt=''/>
                          </div>
                            <h2 className={`${styles.title}`}>Everything you need <span>to run a digital</span> business</h2>
                            <p>Turn all of your customer data into hyper-personalized messages that shoppers want—across email, SMS, push, and more.</p>
                        </div>
                    </motion.div>
                    <motion.div className={`col-md-8 ${styles.cust_right}`}
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <div className={`${styles.video_right}`}>
                        <div className={`${styles.video_laptop}`}>
                        <video controls poster='images/YouTube-Thumbnail.png'>
                            <source src="videos/sample_video.mp4" type="video/mp4"/>
                        </video>
                        </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        </>
    )
}