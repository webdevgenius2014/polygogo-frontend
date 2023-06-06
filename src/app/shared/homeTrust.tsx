'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';

export default function HomeTrust(){
    return(
        <>
            <section className={`${styles.trust_sec}`}>
                <div className={`container ${styles.new_container}`}>
                    <h4 className='text-center text-uppercase'><b>Trusted by:</b>Join 50.000+ websites that use EmbedSocial to sell more</h4>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div><img src='images/cnn.png' alt=''/></div>
                        <div><img src='images/netgeo.png' alt=''/></div>
                        <div><img src='images/florencebymills.png' alt=''/></div>
                        <div><img src='images/ancestry-logo.png' alt=''/></div>
                        <div><img src='images/industrious.png' alt=''/></div>
                        <div><img src='images/nike.png' alt=''/></div>
                    </div>
                </div>
            </section>
        </>
    )
}