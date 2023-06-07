"use client";
import {useState} from 'react';
import dstyles from '../../styles/dashboard/dstyles.module.scss'
import Head from 'next/head'
import Sidebar from './shared/sidebar'
import Topbar from './shared/topbar'
import Footer from './shared/footer';
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [isSidebarExpanded, setIsSidebarExpanded]=useState(false);
    return (
        <>
        <Head>
            <title>Poly Go Go Dashboard</title>
        </Head>
        <div className={dstyles.d_layout}>            
            <Sidebar isExpanded={isSidebarExpanded} />
            <div className={`${dstyles.d_container} ${isSidebarExpanded?'':dstyles.expanded}`}>
                <Topbar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
                <div className={dstyles.page_content}>
                    {children}
                </div>                
                <Footer />
            </div>
        </div>
    </>
    )
}