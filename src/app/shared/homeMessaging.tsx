'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
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

export default function HomeMessaging(){
    return(
        <>
            <section className={`${styles.messaging_sec}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-8'>
                            <motion.div className={`${styles.camp_img}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible">
                                <img src='images/ggh.png' alt=''/>
                            </motion.div>
                        </div>
                        <div className='col-md-4'>
                            <motion.div className={`${styles.space_left}`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible">
                            <div className='mb-4'><img src='images/chat.png' alt=''/></div>
                            <h4 className={`${styles.fig_heading}`}>Messaging</h4>
                            <p className={`${styles.fig_desc}`}>Connect with customers easily through text message and other channels.</p>
                            <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                        </Link>
                           </motion.div>
                           </div>
                    </div>
                </div>
            </section>
        </>
    )
}
