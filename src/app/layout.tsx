import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Poly Go Go',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {   
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>      
      <body className={inter.className}>{children}</body>
    </html>
  )
}