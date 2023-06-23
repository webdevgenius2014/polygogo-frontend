import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import React, {useState} from 'react'
import Link from 'next/link'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
type Props={
    showProfileMenu:boolean;
    userDetails:any;
    toggleProfileMenu:any
}
const ProfileMenuBox: React.FC<Props>=({showProfileMenu, userDetails, toggleProfileMenu })=>{
    const [activeKey, setActiveKey]= useState('details');
    const basrUrl= process.env.NEXT_PUBLIC_API_URL+'/api/images/'  
    const getActiveTab=(activeKey:any)=>{        
        setActiveKey(activeKey)
    }
    return(
        <div className={`${dstyles.profile_menu} ${showProfileMenu===true? dstyles.show:dstyles.hide}`}>
            <div className={`${dstyles.link} ${dstyles.close_btn}`} onClick={()=>toggleProfileMenu()}>
                <img src="/dashboard/icons/close.svg" className="mw-100" alt="close" title="close" />
            </div>
            <div className={`text-center ${dstyles.profile_details}`}>
                {userDetails!==null && (<>
                    {userDetails?.profile_img && <img src={`${basrUrl}${userDetails?.profile_img}`}  className={dstyles.profile_img} alt="" />}
                    {userDetails?.name && <p className={`mb-1 ${dstyles.name}`}>{userDetails?.name}</p>}
                    {userDetails?.phone && <Link href={`tel: ${userDetails?.phone}`} className={`${dstyles.text} ${dstyles.link}`}>{userDetails?.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)-$2-$3")}</Link>}
                </>)}                    
                <p className={`mt-2 mb-2 ${dstyles.text}`}>Recent Activity</p>
                <div className={`d-flex align-items-center justify-content-center flex-wrap ${dstyles.recent_activities}`}>
                    <span className={dstyles.activity}><img src="/dashboard/icons/notification.svg" alt="notification" className='mw-100' /></span>
                    <span className={dstyles.activity}><img src="/dashboard/icons/CSV.svg" alt="CSV" className='mw-100' /></span>
                </div>
                <div className={`d-flex align-items-center justify-content-center flex-wrap ${dstyles.other_options}`}>
                    <Link href="/"><span className={dstyles.option}><img src="/dashboard/icons/chat-circle.svg" alt="chat-circle" className='mw-100' /></span></Link>
                    <Link href="/"><span className={dstyles.option}><img src="/dashboard/icons/phone-left.svg" alt="phone-left" className='mw-100' /></span></Link>
                    <Link href="/"><span className={dstyles.option}><img src="/dashboard/icons/dollar-circle.svg" alt="dollar-circle" className='mw-100' /></span></Link>
                    <Link href="/"><span className={dstyles.option}><img src="/dashboard/icons/dots.svg" alt="dots" className='mw-100' /></span></Link>
                </div>
                <Tabs                       
                    id="profile-menu-tab"                        
                    variant="pills"
                    defaultActiveKey="details"
                    className={`${dstyles.custom_tab_pill}`}
                    onSelect={(activeKey)=>getActiveTab(activeKey)}
                >                        
                    <Tab eventKey="details" title="Details" tabClassName={`${dstyles.custom_pill} ${activeKey==='details'?dstyles.active:''}`}>
                        <div className={`w-100 text-start ${dstyles.tab_content}`}>
                            <ul className='list-unstyled'>
                                <li className={`mb-1 ${dstyles.text}`}><span className={`me-2 ${dstyles.fw_md} ${dstyles.text_primary}`}>Name:</span><span className={`mb-1 ${dstyles.text_gray}`}>{userDetails?.name}</span></li>
                                <li className={`mb-1 ${dstyles.text}`}><span className={`me-2 ${dstyles.fw_md} ${dstyles.text_primary}`}>Phone:</span><span className={`mb-1 ${dstyles.text_gray}`}>{userDetails?.phone}</span></li>
                                <li className={`mb-1 ${dstyles.text}`}><span className={`me-2 ${dstyles.fw_md} ${dstyles.text_primary}`}>Email:</span><span className={dstyles.text_gray}>{userDetails?.email}</span></li>
                            </ul>
                            <p className={`mb-1 ${dstyles.fw_md} ${dstyles.text}`}>Card on File</p>
                            <Link href="/" className={`d-block mb-3 text-decoration-underline ${dstyles.link} ${dstyles.text_primary} ${dstyles.text}`}>Manage saved cards</Link>
                            <p className={`mb-2 ${dstyles.fw_md} ${dstyles.text}`}>Tags</p>
                            <div className={`d-flex align-items-center justify-content-start flex-wrap mb-3 ${dstyles.tags}`}>
                                <span className={dstyles.tag}><span className={`me-2 ${dstyles.text_sm} ${dstyles.text_primary}`}>Tag 1</span><img src="/dashboard/icons/X.svg" alt="X" className={`mw-100 ${dstyles.link}`} /></span>
                                <span className={dstyles.tag}><span className={`me-2 ${dstyles.text_sm} ${dstyles.text_primary}`}>Tag 2</span><img src="/dashboard/icons/X.svg" alt="X" className={`mw-100 ${dstyles.link}`} /></span>
                            </div>
                            <p className={`mb-2 ${dstyles.fw_md} ${dstyles.text}`}>Birthday</p>
                            <Link href="/" className={`d-block ${dstyles.link} ${dstyles.text}`}><span className={dstyles.text_gray}>Add date</span></Link>
                        </div>
                    </Tab>
                    <Tab eventKey="activity" title="Activity" tabClassName={`${dstyles.custom_pill} ${activeKey==='activity'?dstyles.active:''}`} >
                        <div className={`w-100 text-start ${dstyles.tab_content}`}>                                
                            <p className={`mb-2 ${dstyles.fw_md} ${dstyles.text}`}>Activities</p>
                        </div>
                    </Tab>                    
                </Tabs>
            </div> 
        </div>
    );
}
export default ProfileMenuBox;