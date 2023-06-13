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
export default function HomeMarketing(){
    
    return(
        <>
            <section className={`${styles.marketing}`}>
            <motion.h2 className={`text-center ${styles.title} mb-5`}
             variants={fromLeft}
             initial="hidden"
             whileInView="visible"
            >
                The <span>Marketing and Communication</span><br></br> Platform for Local Businesses</motion.h2>
                <div className={`container ${styles.container}`}>
                    <div className={`${styles.back_row} ${styles.one}`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                        <div className='col-md-8'>
                            <motion.div className={`${styles.fig_img}`}
                             variants={fromLeft}
                             initial="hidden"
                             whileInView="visible">
                                <img src='images/bbb.png' alt=''/>
                            </motion.div>
                        </div>
                        <div className='col-md-4'>
                        <motion.div className={`${styles.fig_text}`}
                         variants={fromRight}
                         initial="hidden"
                         whileInView="visible">
                            <div className='mb-4'><img src='images/review-icon.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Reviews</h4>
                                <p className={`${styles.fig_desc}`}>Drive more reviews and website traffic.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.back_row} ${styles.two} mt-3`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                    <div className={`col-md-4 ${styles.twoo}`}>
                        <motion.div className={`${styles.fig_text} ${styles.space_left}`}
                         variants={fromLeft}
                         initial="hidden"
                         whileInView="visible">
                            <div className='mb-4'><img src='images/conversation.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Chat</h4>
                                <p className={`${styles.fig_desc}`}>Turn more website visitors into leads and repeat customers.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </motion.div>
                        </div>
                        <div className={`col-md-8 ${styles.onee}`}>
                            <motion.div className={`${styles.fig_img} text-end`}
                             variants={fromRight}
                             initial="hidden"
                             whileInView="visible">
                                <img src='images/chat_ig.png' alt=''/>
                            </motion.div>
                        </div>
                        
                    </div>
                </div>
                <div className={`${styles.back_row} ${styles.one} mt-3`}>
                    <div className={`row align-items-center ${styles.shift}`}>
                        <div className='col-md-8'>
                            <motion.div className={`${styles.fig_img}`}
                             variants={fromLeft}
                             initial="hidden"
                             whileInView="visible">
                                <img src='images/payment_ig.png' alt=''/>
                            </motion.div>
                        </div>
                        <div className='col-md-4'>
                        <motion.div className={`${styles.fig_text}`}
                         variants={fromRight}
                         initial="hidden"
                         whileInView="visible">
                            <div className='mb-4'><img src='images/operation.png'/></div>
                                <h4 className={`${styles.fig_heading}`}>Payments</h4>
                                <p className={`${styles.fig_desc}`}>Make paying you quick and convenient with text-to-pay and eCard readers.</p>
                                <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                                    </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                </div>
            </section>
        </>
    )
}

