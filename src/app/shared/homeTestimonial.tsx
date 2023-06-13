'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import custData from '../testimonialAPI/testimonial';
const HomeTestimonial=()=>{
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '50px',
        prevArrow: <LeftNavButton/>,
        nextArrow: <RightNavButton/>
    };
    function LeftNavButton(props:any) {
        const {className, style, onClick} = props
        return (
            <div
                className="slick-arrow slick_left"
                style={{...style, display: 'block', position: 'absolute', left: -35, top: 95, cursor:'pointer'}}
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
                style={{...style, display: 'block' , position: 'absolute', right: -35, top: 95, cursor:'pointer'}}
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