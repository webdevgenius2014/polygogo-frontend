'use client'
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
export default function HomeTestimonial(){
    return(
        <>
            <section className={`${styles.testimonial}`}>
                <div className={`container ${styles.container}`}>
                <h2 className={`text-center ${styles.title} mb-5`}>Our blessed client said about us</h2>
                </div>
            </section>
        </>
    )
}