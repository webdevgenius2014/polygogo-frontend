'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import custData from '../testimonialAPI/testimonial';
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

const HomeTestimonial=()=>{
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '50px',
        prevArrow: <LeftNavButton/>,
        nextArrow: <RightNavButton/>,
        responsive:[
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1
                
                }
              }
        ]
    };
    function LeftNavButton(props:any) {
        const {className, style, onClick} = props
        return (
            <div
                className="slick-arrow slick_left"
                style={{...style, display: 'block', position: 'absolute', left: 0, top: 95, cursor:'pointer', zIndex:9}}
                onClick={onClick}
            >
                <img src={"images/slide-arrow_left.png"} alt="arrow_left"/>
            </div>
        );
    }
    function RightNavButton(props:any) {
        const {className, style, onClick} = props
        return (
            <div
                className="slick-arrow slick_left"
                style={{...style, display: 'block' , position: 'absolute', right: 0, top: 95, cursor:'pointer', zIndex:9}}
                onClick={onClick}
            >
                <img src={"images/slide-arrow_right.png"} alt="arrow_right"/>
            </div>
        );
    }
    
    const userData = custData;
        
    return(
        <>
            <section className={`${styles.testimonial}`}>
                <div className={`container ${styles.container}`}>
                <motion.h2 className={`text-center ${styles.title} mb-5`}
                variants={fromLeft}
                initial="hidden"
                whileInView="visible">Our blessed client said about us</motion.h2>
                <div>

                <Slider {...settings}>
                    {
                        userData.map((data,index)=>(
                            <motion.div key={index}
                            variants={fromLeft}
                            initial="hidden"
                            whileInView="visible">
                                <div className={`${styles.item}`}>
                                    <h5>{data.title}</h5>
                                    <p>{data.description}</p>
                                </div>
                                <div className={`${styles.user_info} d-flex align-items-center`}>
                                    <div className='me-3'><img src={data.image}/></div>
                                    <div>
                                        <h6>{data.author}</h6>
                                        <p>{data.position}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )

                        )
                    }
                  
                </Slider>
            </div>
                </div>
            </section>
        </>
    )
}
export default HomeTestimonial;