'use client'
import styles from '../../styles/styles.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../global/header';
import HomeBanner from '../shared/homeBanner';
import HomeTrust from '../shared/homeTrust';
import HomeVideo from '../shared/homeVideo';
import HomeReason from '../shared/homeReason';
import HomeMarketing from '../shared/homeMarketing';

export default function Homepage(){
    return(
        <>
        <Header/>
            <HomeBanner/>
            <HomeTrust/>
            <HomeVideo/>
            <HomeReason/>
            <HomeMarketing/>
        </>
    )
}
