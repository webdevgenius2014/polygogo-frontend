import { useEffect, useState } from 'react'
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import Search from './search'
import Link from 'next/link'
type Prop={
    isExpanded?: boolean,
    setIsExpanded:(val: boolean) => void
}
const Topbar:React.FC<Prop>=({isExpanded, setIsExpanded})=>{
    const [btnIcon, setBtnIcon]=useState({name:'toggle-icon.svg', altText:'toggle-icon', width:'2.5'});

    const toggleSidebar=()=>{
        if(isExpanded){
            setIsExpanded(false);
        }else{
            setIsExpanded(true);
        }
    }
    useEffect(()=>{
        if(isExpanded){
            setBtnIcon({name:'back-arrow.svg', altText:'back-arrow', width:'1.875'});
        }else{
            setBtnIcon({name:'toggle-icon.svg', altText:'toggle-icon', width:'2.5'});
        }
    },[isExpanded]);
    return(
        <div className={dstyles.topbar}>
            <button className={`${dstyles.btn} ${dstyles.toggle_btn}`}><img src={`/dashboard/icons/${btnIcon.name}`} alt={btnIcon.altText} style={{width:`${btnIcon.width}rem`}} onClick={()=>toggleSidebar()} /></button>
            <div className='row w-100'>
                <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                    <Search />
                </div>
                <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-end'>
                    <div><img src="/dashboard/icons/bell.svg" alt="bell" /></div>
                    <span className={dstyles.vrt_border}></span>
                    <Link href="/dashboard/profile" className={dstyles.user_wrap}>
                        <img src="/dashboard/user-icon.png" alt="user-icon" className={dstyles.icon} />
                        <span className={dstyles.name}>Stephen C.</span>
                    </Link>
                </div>    
            </div>
        </div>
    );
}
export default Topbar;