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

export default function HomePhones(){
    return(
        <>
             <section className={`${styles.campaign_sec}`}>
                <div className={`container ${styles.container}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-4'>
                            <motion.div className={`${styles.space_left}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible">
                            <div className='mb-4'><img src='images/telephone.png' alt=''/></div>
                            <h4 className={`${styles.fig_heading}`}>Phones</h4>
                            <p className={`${styles.fig_desc}`}>Miss fewer calls and capture up to 10x more leads.</p>
                            <Link className={`${styles.btn} ${styles.btn_tertiary} mt-0`} 
                                    href="/register">
                                        <span className='fw-bold'>Read More</span><img src='icons/right_arrow.svg' alt=''/>
                           
                                        </Link>
                           </motion.div>
                           </div>         
                        
                        <div className='col-md-8'>
                            <motion.div className={`${styles.camp_img} text-end`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible">
                                <img src='images/phone_img.png' alt=''/>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}