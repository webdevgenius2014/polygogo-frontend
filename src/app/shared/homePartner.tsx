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

export default function HomePartner(){
    return(
    <>
        <section className={`${styles.partner_sec}`}>
            <div className={`container ${styles.container}`}>
             <motion.h2 className={`text-center ${styles.title} mb-5`}
             variants={fromLeft}
             initial="hidden"
             whileInView="visible">Grow Your Business With <span>Polygogo Partner</span></motion.h2>
             <div className={`${styles.partner_div}`}>
             <div className={`${styles.partner_back}`}>
                <div className='row'>
                    <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.logo_div}`}
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible">
                            <img src='images/lorem.png'/>
                        </motion.div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.logo_div}`}
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible">
                            <img src='images/logospim.png'/>
                        </motion.div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.logo_div}`}
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible">
                            <img src='images/circle.png'/>
                        </motion.div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.logo_div}`}
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible">
                            <img src='images/Unique-Network.png'/> 
                        </motion.div>
                    </div>
                </div>
                
             </div>
             <div className={`${styles.partner_back} ${styles.partner_btm} mt-5 text-center`}>
                    <div className='row mb-5'>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible"><img src='images/amara.png' alt=''/></motion.div>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible"><img src='images/hexa.png' alt=''/></motion.div>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible"><img src='images/aven.png' alt=''/></motion.div>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible"><img src='images/velocityu.png' alt=''/></motion.div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible"><img src='images/treva.png' alt=''/></motion.div>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible"><img src='images/ideas.png' alt=''/></motion.div>
                            
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible"><img src='images/Light-AI.png' alt=''/></motion.div>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <motion.div className={`${styles.nom}`}
                            variants={fromRight}
                            initial="hidden"
                            whileInView="visible"><img src='images/fox-hub.png' alt=''/></motion.div>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-5'><Link className={`${styles.site_link} me-2`} 
                        href="/">
                            <span className='fw-bold'>View All Partner</span>
                                <img src='images/Vector.png'/>
                        </Link></div>
                
             </div>
            </div>
        </section>
    </>
    )
}