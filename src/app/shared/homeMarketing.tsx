'use client'
import styles from '../../styles/styles.module.scss';
export default function HomeMarketing(){
    return(
        <>
            <section className={`${styles.marketing}`}>
                <div className={`container ${styles.container}`}>
                <h2 className={`text-center ${styles.title}`}>The <span>Marketing and Communication</span><br></br> Platform for Local Businesses</h2>
                </div>
            </section>
        </>
    )
}

