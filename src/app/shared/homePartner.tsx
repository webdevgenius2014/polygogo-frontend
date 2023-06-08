'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomePartner(){
    return(
    <>
        <section className={`${styles.partner_sec}`}>
            <div className={`container ${styles.container}`}>
             <h2 className={`text-center ${styles.title} mb-5`}>Grow Your Business With <span>Polygogo Partner</span></h2>
             <div className={`${styles.partner_div}`}>
             <div className={`${styles.partner_back}`}>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className={`${styles.logo_div}`}>
                            <img src='images/lorem.png'/>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className={`${styles.logo_div}`}>
                            <img src='images/logospim.png'/>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className={`${styles.logo_div}`}>
                            <img src='images/circle.png'/>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className={`${styles.logo_div}`}>
                            <img src='images/Unique-Network.png'/> 
                        </div>
                    </div>
                </div>
                
             </div>
             <div className={`${styles.partner_back} ${styles.partner_btm} mt-5 text-center`}>
                    <div className='row mb-5'>
                        <div className='col-md-3'>
                            <div><img src='images/amara.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/hexa.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/aven.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/velocityu.png' alt=''/></div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div><img src='images/treva.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/ideas.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/Light-AI.png' alt=''/></div>
                        </div>
                        <div className='col-md-3'>
                            <div><img src='images/fox-hub.png' alt=''/></div>
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