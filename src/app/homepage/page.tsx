'use client'
import styles from '../../styles/styles.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../global/header';
import HomeBanner from '../shared/homeBanner';

export default function Homepage(){
    return(
        <>
        <Header/>
            <HomeBanner/>
        </>
    )
}
