import { useEffect, useState } from 'react'
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import Search from './search'
import Link from 'next/link'
import AuthService from '../../../services/auth.service';
import ProfileService from '../../../services/profile.service';
import { useRouter } from 'next/navigation'
import ProfileMenuBox from './profileMenu'
import MobileMenuBox from "./mobileMenu"
type Prop={
    isExpanded?: boolean,
    setIsExpanded:(val: boolean) => void
}
const Topbar:React.FC<Prop>=({isExpanded, setIsExpanded})=>{
    const [btnIcon, setBtnIcon]=useState({name:'toggle-icon.svg', altText:'toggle-icon', width:'2.5'});
    const [scroll, setScroll] = useState(false);
    const [showProfileMenu, setProfileMenu]=useState<boolean | false>(false);
    const [showMobileMenu, setMobileMenu]=useState<boolean | false>(false);
    const [userDetails, setUserDetails]=useState<any | null>(null);
    const basrUrl= process.env.NEXT_PUBLIC_API_URL+'/api/images/';    
    const router= useRouter();
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
    const toggleProfileMenu=()=>{
        setProfileMenu(!showProfileMenu);
    } 
    useEffect(()=>{
        const getUserData = async ()=>{
            await ProfileService.getCurrentUser().then((response)=>{
                if(response?.status===200 && response?.data.error===false){
                    setUserDetails(response?.data?.data);
                }
            })
        }
        getUserData();
    },[]);     
    const logoutUser=()=>{
        AuthService.logout();
        router.push('/');
    }  
    const toglemobileMenu=()=>{
        setMobileMenu(!showMobileMenu);
    }
     
    return(      
        <div className={`position-ralative ${dstyles.topbar} ${scroll?dstyles.sticky:''}`}>
            <button className={`${dstyles.btn} ${dstyles.toggle_btn}`}><img src={`/dashboard/icons/${btnIcon.name}`} alt={btnIcon.altText} style={{width:`${btnIcon.width}rem`}} onClick={()=>toggleSidebar()} /></button>
            <div className='row w-100'>
                <div className='col-sm-3 col-md-3 col-lg-3 col-xl-2 d-flex align-items-center d-none d-lg-block'>
                    <div className={`dropdown ${dstyles.dropdown}`}>
                        <button className={`btn bg-white dropdown-toggle ${dstyles.dropdown_btn}`} type="button" id="activeCompany" data-bs-toggle="dropdown" aria-expanded="false">
                           Active Company
                        </button>
                        <ul className={`dropdown-menu ${dstyles.dropdown_list}`} aria-labelledby="activeCompany">
                            <li><a className="dropdown-item" href="/">Acme Corporation</a></li>
                            <li><a className="dropdown-item" href="/">Globex Corporation</a></li>
                            <li><a className="dropdown-item" href="/">Soylent Corp</a></li>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-4 col-xl-5 d-none d-lg-block'>                    
                    <Search />
                </div>
                <div className='col-sm-4 col-md-4 col-lg-5 col-xl-5 align-items-center justify-content-end d-none d-lg-flex'>
                    <Link href="/" className='me-3'><img src="/dashboard/icons/settings.svg" width="34" height="34" className='mw-100' /></Link>
                    <div className={`me-2 ${dstyles.notification_bell}`}>
                        <img src="/dashboard/icons/bell.svg" alt="bell" />
                        <span className={`d-inline-flex align-items-center justify-content-center ${dstyles.count}`}>1</span>
                    </div>
                    <span className={dstyles.vrt_border}></span>                    
                    <div className={`d-inline-block`}>
                        <div className={`${dstyles.user_wrap}`}>
                            <Link href="/dashboard/profile/" className={`${dstyles.user_wrap} ${dstyles.link}`}>
                                <div className={dstyles.user_image}>{userDetails!==null && userDetails?.profile_img?<img src={`${basrUrl}${userDetails?.profile_img}`} alt="user-icon" className={`mw-100 h-100`} />:<img src="/dashboard/user-icon.png" alt="user-icon" className={dstyles.icon} /> } </div>                                
                                {userDetails!==null && userDetails?.name && <span className={dstyles.name}>{userDetails?.name}</span>}                                                     
                            </Link>
                        </div>                    
                    </div>
                    <button type='button' onClick={()=>logoutUser()} className={`ms-3 me-0 d-inline-flex align-items-center justify-content-center ${dstyles.btn_logout}`} data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="bottom" title="Logout"><img src="/dashboard/icons/logout.svg" alt="logout" width="21" height="21" className='mw-100' /></button>                   
                </div> 
                <div className='ms-3 text-end d-flex align-items-center justify-content-end d-lg-none'>
                    <button type='button' onClick={()=>toglemobileMenu()} className={`ms-3 me-0 d-inline-flex align-items-center justify-content-center ${dstyles.btn_logout}`} data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="bottom" title="Logout"><img src="/dashboard/icons/dots.svg" alt="dots" className='mw-100' /></button>
                    <button type='button' onClick={()=>logoutUser()} className={`ms-3 me-0 d-inline-flex align-items-center justify-content-center ${dstyles.btn_logout}`} data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="bottom" title="Logout"><img src="/dashboard/icons/logout.svg" alt="logout" width="21" height="21" className='mw-100' /></button>
                </div>                
            </div>
            <MobileMenuBox showMobileMenu={showMobileMenu} userDetails={userDetails} toggleMobileMenu={toglemobileMenu} />
            {/* <ProfileMenuBox showProfileMenu={showProfileMenu} userDetails={userDetails} toggleProfileMenu={toggleProfileMenu} />             */}
        </div>
    );
}
export default Topbar;