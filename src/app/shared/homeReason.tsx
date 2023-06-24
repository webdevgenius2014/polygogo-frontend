'use client'
import styles from '../../styles/styles.module.scss';
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
export default function HomeReason(){
    return(
        <>
            <section className={`${styles.reason_sec}`}>
                <div className={`container ${styles.container}`}>
                    <motion.h2 className={`mb-5 text-center ${styles.title} ${styles.col_white}`}
                    variants={fromLeft}
                    initial="hidden"
                    whileInView="visible"
                    >Here are a few Reasons Why<br></br> Businesses love Polygogo</motion.h2>
                    <div className={`row ${styles.reason_row}`}>
                        <div className='col-lg-3 col-md-6'>
                            <motion.div className={`${styles.block_res}`}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible">
                                <div className='mb-4'><img src='images/block_1_icon.png'/></div>
                                <div className={`${styles.block_height}`}>
                                    <h5>Get more Reviews</h5>
                                    <p>In the beginning, the company only had <span>28 Google reviews, but now it has over 600.</span> It's also easy for staff.</p>
                                </div>
                                <div className={`d-flex ${styles.author_detail}`}>
                                    <div><img src='images/author.png' alt=''/></div>
                                    <div className={`${styles.author_data}`}>
                                        <h6>Max Stoiber</h6>
                                        <p>Senior Marketing Officer</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.block_res}`}
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible"
                        >
                                <div className='mb-4'><img src='images/block_1_icon.png'/></div>
                                <div className={`${styles.block_height}`}>
                                    <h5>Convert Customers</h5>
                                    <p>I'm getting <span>10x more</span> website leads using Podium's Webchat.</p>
                                </div>
                                <div className={`d-flex ${styles.author_detail}`}>
                                    <div><img src='images/author.png' alt=''/></div>
                                    <div className={`${styles.author_data}`}>
                                        <h6>Max Stoiber</h6>
                                        <p>Senior Marketing Officer</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.block_res}`}
                        variants={fromLeft}
                        initial="hidden"
                        whileInView="visible">
                                <div className='mb-4'><img src='images/block_1_icon.png'/></div>
                                <div className={`${styles.block_height}`}>
                                    <h5>Communicate Faster</h5>
                                    <p>We respond to texts, social posts, and emails from <span>customers in 10 minutes</span></p>
                                </div>
                                <div className={`d-flex ${styles.author_detail}`}>
                                    <div><img src='images/author.png' alt=''/></div>
                                    <div className={`${styles.author_data}`}>
                                        <h6>Max Stoiber</h6>
                                        <p>Senior Marketing Officer</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <motion.div className={`${styles.block_res} mb-0`}
                        variants={fromRight}
                        initial="hidden"
                        whileInView="visible">
                                <div className='mb-4'><img src='images/block_1_icon.png'/></div>
                                <div className={`${styles.block_height}`}>
                                    <h5>Increase Revenue</h5>
                                    <p>In the last 12 months, we've generated <span>$130,000 in revenue</span> through the tool.</p>
                                </div>
                                <div className={`d-flex ${styles.author_detail}`}>
                                    <div><img src='images/author.png' alt=''/></div>
                                    <div className={`${styles.author_data}`}>
                                        <h6>Max Stoiber</h6>
                                        <p>Senior Marketing Officer</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}