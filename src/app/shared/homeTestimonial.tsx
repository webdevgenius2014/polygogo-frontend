'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import custData from '../testimonialAPI/testimonial';
const HomeTestimonial=()=>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '50px'
    };
    
    const userData = custData;
        
    return(
        <>
            <section className={`${styles.testimonial}`}>
                <div className={`container ${styles.container}`}>
                <h2 className={`text-center ${styles.title} mb-5`}>Our blessed client said about us</h2>
                <div>

                <Slider {...settings}>
                    {
                        userData.map((data,index)=>(
                            <div key={index}>
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
                            </div>
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