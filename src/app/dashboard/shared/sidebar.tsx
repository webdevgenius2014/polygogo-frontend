import { useEffect, useState } from 'react';
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import Link from 'next/link'
import Navigation from './navigation';
type Prop={
    isExpanded?: boolean; 
    brandImg?:string; 
}
const Sidebar: React.FC<Prop>=({isExpanded})=>{   
    const [brandImg, setBrandImage]= useState({name:'polygogo-icon.svg', altText:'polygogo-icon', class:dstyles.brand_icon});
    useEffect(()=>{
        if(isExpanded){
            setBrandImage({name:'polygogo-logo.svg', altText:'polygogo-logo', class:dstyles.brand_image })  
        }else{
            setBrandImage({name:'polygogo-icon.svg', altText:'polygogo-icon', class:dstyles.brand_icon})  
        }
    },[isExpanded])
    return(
        <section className={`${dstyles.sidebar} ${isExpanded?dstyles.expanded:dstyles.compact}`}>            
            <Link href="/dashboard" className={dstyles.brand}>
                <img src={`/dashboard/${brandImg.name}`} alt={brandImg.altText} className={brandImg.class}  />
            </Link>
            <Navigation isExpanded={isExpanded} />            
        </section>
    )
}
export default Sidebar;