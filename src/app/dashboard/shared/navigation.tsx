'use client'; 
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import dstyles from '../../../styles/dashboard/dstyles.module.scss'

type Prop={
    isExpanded?: boolean;
} 
const navLinks=[
    {
        label:'Dashboard',
        path:'/dashboard',
        icon:{
            name:'dashboard.svg',
            altText:'dashboard',
            width:'1.625'
        }
    },
    {
        label:'Contacts',
        path:'/dashboard/contacts',       
        icon:{
            name:'contacts.svg',
            altText:'contacts',
            width:'1.313'
        }
    },
    {
        label:'Marketing',
        path:'/dashboard/marketing',       
        icon:{
            name:'marketing.svg',
            altText:'marketing',
            width:'1.438'
        }
    },
    {
        label:'Review',
        path:'/dashboard/review',        
        icon:{
            name:'review.svg',
            altText:'review',
            width:'1.438'
        }
    },
    {
        label:'Email/SMS Template',
        path:'/dashboard/email-template',       
        icon:{
            name:'email-sms.svg',
            altText:'email-sms',
            width:'1.438'
        }
    },
    {
        label:'Reporting',
        path:'/dashboard/reporting',        
        icon:{
            name:'reporting.svg',
            altText:'reporting',
            width:'1.625'
        }
    },
    {
        label:'Automatic Review',
        path:'/dashboard/automatic-review',       
        icon:{
            name:'automatic-review.svg',
            altText:'automatic-review',
            width:'1.5'
        }
    },
    {
        label:'Company Profile',
        path:'/dashboard/company-profile',       
        icon:{
            name:'company-profile-icon.svg',
            altText:'company-profile-icon',
            width:'1.438'
        }
    },
    {
        label:'Payments',
        path:'/dashboard/payments',       
        icon:{
            name:'cash-payment.svg',
            altText:'cash-payment',
            width:'1.75'
        }
    },
    {
        label:'Faq',
        path:'/dashboard/faq',      
        icon:{
            name:'faq-icon.svg',
            altText:'faq-icon',
            width:'1.563'
        }
    }
];
const Navigation: React.FC<Prop>=({isExpanded})=>{
  const pathname = usePathname();  
  return (
    <ul className="nav nav-pills flex-column w-100">
      {navLinks.map((link, index) => {
        const isActive= pathname === link.path?true:false;
        return (
            <li key={`item-${index}`} className={`nav-item ${dstyles.nav_item} ${isActive?dstyles.active:''}`}>
                <Link
                    className={`nav-link align-middle px-0 ${dstyles.nav_link} ${isActive ?dstyles.active:''}`}
                    href={link.path}
                    key={link.label}
                >                       
                    <img src={`/dashboard/icons/${link.icon.name}`} alt={link.icon.altText} style={{width:`${link.icon.width}rem`}} className={dstyles.nav_icon} />
                    {isExpanded && <span className={dstyles.nav_text}>{link.label}</span>}
                    
                </Link>
            </li>          
        );
      })}
    </ul>
  );
} 
export default Navigation; 