import dstyles from '../../../styles/dashboard/dstyles.module.scss'
const Footer=()=>{
    return(
        <footer className={dstyles.footer}>
            <p className={`mb-0 ${dstyles.copyright}`}>© 2023 Polygogo. All rights reserved.</p>
        </footer>
    )
}
export default Footer;