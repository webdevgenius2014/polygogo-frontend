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
import HomeAccount from '../shared/homeAccount';
import HomeCampaign from '../shared/homeCampaign';
import HomeMessaging from '../shared/homeMessaging';
import HomePartner from '../shared/homePartner';
import HomePhones from '../shared/homePhones';
import HomeTestimonial from '../shared/homeTestimonial';

export default function Homepage(){
    return(
        <>
        <Header/>
            <HomeBanner/>
            <HomeTrust/>
            <HomeVideo/>
            <HomeReason/>
            <HomeMarketing/>
            <HomeAccount/>
            <HomeCampaign/>
            <HomeMessaging/>
            <HomePartner/>
            <HomePhones/>
            <HomeTestimonial/>
        </>
    )
}
