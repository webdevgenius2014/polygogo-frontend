import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import React from 'react'
import Link from 'next/link'
type Props={
    showMobileMenu:boolean;
    userDetails:any;
    toggleMobileMenu:any
}
const MobileMenuBox: React.FC<Props>=({showMobileMenu, userDetails, toggleMobileMenu })=>{    
    const basrUrl= process.env.NEXT_PUBLIC_API_URL+'/api/images/' ;   
    return(
        <div className={`${dstyles.mobile_menu} ${showMobileMenu===true? dstyles.show:dstyles.hide}`}>
            <div className={`${dstyles.link} ${dstyles.close_btn}`} onClick={()=>toggleMobileMenu()}>
                <img src="/dashboard/icons/close.svg" className="mw-100" alt="close" title="close" />
            </div>
            <div className={`text-center ${dstyles.profile_details}`}>
                <ul className='list-unstyled text-start p-2'>
                    <li className={`p-2 ${dstyles.text}`} >
                        <Link href="/dashboard/profile" className={dstyles.link}>Complete Profile</Link>
                    </li>
                    <li className={`p-2 ${dstyles.text}`}>
                        <Link href="/" className={dstyles.link} >Settings</Link>
                    </li>
                </ul>
                {/* {userDetails!==null && (<>
                    {userDetails?.profile_img && <img src={`${basrUrl}${userDetails?.profile_img}`}  className={dstyles.profile_img} alt="" />}
                    {userDetails?.name && <p className={`mb-1 ${dstyles.name}`}>{userDetails?.name}</p>}
                    {userDetails?.phone && <Link href={`tel: ${userDetails?.phone}`} className={`${dstyles.text} ${dstyles.link}`}>{userDetails?.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)-$2-$3")}</Link>}
                </>)}   */}
            </div> 
        </div>
    );
}
export default MobileMenuBox;