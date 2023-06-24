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

export default function HomeAccount(){
    return(
        <>
            <section className={`${styles.account}`}>
            <div className={`container ${styles.container}`}>
                    <div className={`${styles.fig}`}>
                        <motion.h2 className={`mb-5 text-center ${styles.title} ${styles.col_white}`}
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible"
                        
                        >Create a free account.<br></br>Connect with customers easily.</motion.h2>
                        <motion.form
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible">
                            <div className={`d-flex ${styles.newsletter_col}`}>
                                <input type='email' placeholder='Enter your email...' className={`form-control ${styles.news_field}`}/>
                                <button type='submit' className={`${styles.btn} ${styles.btn_tertiary} ${styles.btn_submit} mt-0`}><span className='fw-bold'>Start Free Trial</span><img src='icons/right_arrow.svg'/></button>
                                
                                </div>
                                <p>Free plan available. No credit card required.</p>
                        </motion.form>
                    </div>
                </div>
            </section>
        </>
    )
}