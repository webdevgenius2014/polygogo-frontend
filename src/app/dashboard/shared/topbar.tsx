import { useEffect, useState } from 'react'
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import Search from './search'
import Link from 'next/link'
import AuthService from '../../../services/auth.service';
import ProfileService from '../../../services/profile.service';
import { useRouter } from 'next/navigation'
type Prop={
    isExpanded?: boolean,
    setIsExpanded:(val: boolean) => void
}
const Topbar:React.FC<Prop>=({isExpanded, setIsExpanded})=>{
    const [btnIcon, setBtnIcon]=useState({name:'toggle-icon.svg', altText:'toggle-icon', width:'2.5'});
    const [scroll, setScroll] = useState(false);
    const [showProfileMenu, setProfileMenu]=useState<boolean | false>(false);
    const [userDetails, setUserDetails]=useState<any | null>(null);
    const basrUrl= process.env.NEXT_PUBLIC_API_URL+'/api/images/'
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
    // useEffect(() => {
    //     console.log(window.scrollY)
    //     window.addEventListener("scroll", () => {
    //         setScroll(window.scrollY > 50);
    //     });
    // }); 
    const logoutUser=()=>{
        AuthService.logout();
        router.push('/');
    }   
    return(      
        <div className={`position-ralative ${dstyles.topbar} ${scroll?dstyles.sticky:''}`}>
            <button className={`${dstyles.btn} ${dstyles.toggle_btn}`}><img src={`/dashboard/icons/${btnIcon.name}`} alt={btnIcon.altText} style={{width:`${btnIcon.width}rem`}} onClick={()=>toggleSidebar()} /></button>
            <div className='row w-100'>
                <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                    <Search />
                </div>
                <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-end'>
                    <div><img src="/dashboard/icons/bell.svg" alt="bell" /></div>
                    <span className={dstyles.vrt_border}></span>                    
                    <div className={`d-inline-block`}>
                        <div className={`${dstyles.user_wrap}`}>
                            <Link href="/dashboard/profile/" className={`${dstyles.user_wrap} ${dstyles.link}`}>
                                <div className={dstyles.user_image}>{userDetails!==null && userDetails?.profile_img?<img src={`${basrUrl}${userDetails?.profile_img}`} alt="user-icon" className={`mw-100 h-100`} />:<img src="/dashboard/user-icon.png" alt="user-icon" className={dstyles.icon} /> } </div>                                
                                {userDetails!==null && userDetails?.name && <span className={dstyles.name}>{userDetails?.name}</span>}                                                     
                            </Link>
                            <span onClick={()=>toggleProfileMenu()} className={`${dstyles.dropdown_btn} ${showProfileMenu===true?dstyles.open:''}`}><img src="/dashboard/icons/down-angle.svg" alt="down-angle" /></span>    
                        </div>                    
                    </div>
                    <button type='button' className={`mt-0 ms-3 me-0 p-2 ${dstyles.btn} ${dstyles.btn_secondary}`} onClick={()=>logoutUser()}>
                        <span className='fw-bold'>Logout</span>
                    </button>                    
                </div>                
            </div>
            <div className={`${dstyles.profile_menu} ${showProfileMenu===true? dstyles.show:dstyles.hide}`}>
                <div className={`${dstyles.link} ${dstyles.close_btn}`} onClick={()=>toggleProfileMenu()}>
                    <img src="/dashboard/icons/close.svg" className="mw-100" alt="close" title="close" />
                </div>
                {userDetails!==null && (<div className={`text-center ${dstyles.profile_details}`}>
                    {userDetails?.profile_img && <img src={`${basrUrl}${userDetails?.profile_img}`}  className={dstyles.profile_img} alt="" />}
                    {userDetails?.name && <p className={`mb-1 ${dstyles.name}`}>{userDetails?.name}</p>}
                    {userDetails?.phone && <Link href={`tel: ${userDetails?.phone}`} className={`${dstyles.text} ${dstyles.link}`}>{userDetails?.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)-$2-$3")}</Link>}
                    {/* {userDetails?.name && <p className={dstyles.name}>{userDetails?.text}</p>} */}
                </div> )}                
                
            </div>
        </div>
    );
}
export default Topbar;