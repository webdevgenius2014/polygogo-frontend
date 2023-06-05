'use client'
import styles from '../../styles/styles.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../shared/header';

export default function Homepage(){
    return(
        <>
        <Header/>
            <h2>Homepage here</h2>
        </>
    )
}
