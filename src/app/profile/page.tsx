'use client';
import styles from '../styles/styles.module.scss'
import { useAuth } from '../middleware/middleware'
export default function Profile() {
  useAuth();
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          complete Profile
        </div>
    </main>
  )
}