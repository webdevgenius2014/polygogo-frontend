'use client'
import Image from 'next/image'
import styles from './styles/styles.module.scss'
import { useAuth } from './middleware/middleware'
export default function Home() {  
  useAuth();
  return (
    <main className={styles.main}><h1>Hello welcome to next.js</h1></main>
  )
}
