'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
export default function Footer(){
    return(
        <>
            <footer>
                <div className={`${styles.footer_top} ${styles.account}`}>
                    <div className={`container ${styles.container}`}>
                        <h2 className={`text-center ${styles.title} mb-5`}><span>Ready to grow?</span> Get a 14-day free trial<br></br> with Polygogo  today, risk-free, no<br></br> credit card required.</h2>
                        <form>
                            <div className={`d-flex ${styles.newsletter_col}`}>
                                <input type='email' placeholder='Enter your email...' className={`form-control ${styles.news_field}`}/>
                                <button type='submit' className={`${styles.btn} ${styles.btn_tertiary} ${styles.btn_submit} mt-0`}><span className='fw-bold'>Start Free Trial</span><img src='icons/right_arrow.svg'/></button>
                                </div>
                        </form>
                    </div>
                </div>

                <div className={`${styles.footer_btm}`}>
                    <div className={`container ${styles.container}`}>
                        <div className='row'>
                            <div className='col-md-2'>
                                <div className={`${styles.footer_col}`}>
                                    <h6>Product</h6>
                                    <Link href="/"><p>Reviews</p></Link>
                                    <Link href="/"><p>Payments</p></Link>
                                    <Link href="/"><p>Webchat</p></Link>
                                    <Link href="/"><p>Channels</p></Link>
                                    <Link href="/"><p>Contacts</p></Link>
                                    <Link href="/"><p>Pricing Inbox</p></Link>
                                    <Link href="/"><p>Text Campaigns</p></Link>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className={`${styles.footer_col}`}>
                                    <h6>Resources</h6>
                                    <Link href="/"><p>Blog</p></Link>
                                    <Link href="/"><p>Google Reviews</p></Link>
                                    <Link href="/"><p>Online Reviews</p></Link>
                                    <Link href="/"><p>Business Text Messaging Contact</p></Link>
                                    <Link href="/"><p>Sales</p></Link>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className={`${styles.footer_col}`}>
                                    <h6>Partners</h6>
                                    <Link href="/"><p>Become a Partner</p></Link>
                                    <Link href="/"><p>Hire an Expert</p></Link>
                                    <Link href="/"><p>Integrations</p></Link>
                                    <Link href="/"><p>Marketplace</p></Link>
                                    <Link href="/"><p>Developer Portal</p></Link>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className={`${styles.footer_col}`}>
                                    <h6>Company</h6>
                                    <Link href="/"><p>About us</p></Link>
                                    <Link href="/"><p>Contact</p></Link>
                                    <Link href="/"><p>Careers Press</p></Link>
                                    <Link href="/"><p>Partners</p></Link>
                                    <Link href="/"><p>Legal</p></Link>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className={`${styles.footer_col}`}>
                                    <h6>Australia</h6>
                                    <Link href="/"><p>1000 W Dummy<br></br>UT Dummy 100000</p></Link>
                                    <ul className='d-flex mt-3'>
                                        <li><Link href="/"><img src='images/facebook.png' alt=''/></Link></li>
                                        <li><Link href="/"><img src='images/instagram.png' alt=''/></Link></li>
                                        <li><Link href="/"><img src='images/LinkedIn.png' alt=''/></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={`${styles.vertical_space}`}></hr>
                    <div className={`container ${styles.container} ${styles.copyright}`}>
                        <div className='row'>
                            <div className='col-md-3'>
                                <p className='text-start'>© Polygogo. 2023</p>
                            </div>
                            <div className='col-md-9'>
                                <div className={`${styles.copyright_right}`}>
                                    <ul>
                                        <li><Link href="/">Sitemap</Link></li>
                                        <li><Link href="/">Terms & Conditions</Link></li>
                                        <li><Link href="/">Privacy</Link></li>
                                        <li><Link href="/">Vulnerability Policy</Link></li>
                                        <li><Link href="/">Do Not Sell or Share My Personal Information</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </footer>
        </>
    )
}