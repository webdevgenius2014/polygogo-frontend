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

export default function HomeTrust(){
    return(
        <>
            <section className={`${styles.trust_sec}`}>
                <div className={`container ${styles.new_container}`}>
                    <motion.h4 className='text-center text-uppercase'
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible"
                    ><b>Trusted by:</b>Join 50.000+ websites that use EmbedSocial to sell more</motion.h4>
                    <motion.div className='d-flex align-items-center justify-content-between'
                    variants={fromRight}
                    initial="hidden"
                    whileInView="visible"
                    >
                        <div><img src='images/cnn.png' alt=''/></div>
                        <div><img src='images/netgeo.png' alt=''/></div>
                        <div><img src='images/florencebymills.png' alt=''/></div>
                        <div><img src='images/ancestry-logo.png' alt=''/></div>
                        <div><img src='images/industrious.png' alt=''/></div>
                        <div><img src='images/nike.png' alt=''/></div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}