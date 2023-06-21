import { ReactNode } from "react"
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import Modal from 'react-bootstrap/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleButton from './googleButton';
import FacebookButton from "./facebookButton";
import GlassDoorButton from "./glassdoorButton";
export type childrenType = ReactNode;
type ModalProps={
    children?: childrenType;
    modalId:string; 
    platformName:string;
    buttonLabel:string;
    buttonAction:(val:any)=>void;
    icon:(any);      
    message:any;
    setMessage:(val:any)=>void;  
    isShowPlatformModal:boolean;
    showBusinessModal:any; 
    closePlatformModal:any ;
}
const ReviewModal: React.FC<ModalProps>=({modalId, isShowPlatformModal, closePlatformModal, buttonLabel, buttonAction, platformName, icon, message, setMessage, showBusinessModal, children })=>{   
    const clientId= process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; 
    const handleReview=()=>{
        // buttonAction;
    }    
    const handleNextMoadl=()=>{
        closePlatformModal();
        showBusinessModal();
    }
    return(<> 
        <Modal show={isShowPlatformModal} onHide={closePlatformModal} className={`${dstyles.custom_modal}`} id={modalId} backdrop={true} centered  >
            <Modal.Header closeButton>
                <h5 className="modal-title" id="ReviewModalLabel">Connect With {platformName} </h5>
            </Modal.Header>
            <Modal.Body className={`${dstyles.search_business}`}>
            <div className="text-center mb-4">                           
                {platformName ==='Google' && clientId && (<> 
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleButton message={message} setMessage={setMessage} savePlatform={buttonAction}  />
                    </GoogleOAuthProvider>
                    <p className="mt-4">Don't have google business listing access? <span className={dstyles.link} onClick={()=>handleNextMoadl()}>click here </span></p>
                </>)}
                {platformName==='Facebook' && (
                    <FacebookButton />
                )}
                {platformName==='Glassdoor' && (
                    <GlassDoorButton />
                )}
                {platformName!=='Google' && platformName!=='Facebook' && platformName!=='Glassdoor' && (
                    <button type="button" className={`${dstyles.btn} ${dstyles.other_login}`} aria-label="review-btn" onClick={()=>handleReview()}>
                        <img src={icon?.image} alt={icon?.alt} className="me-2" />
                        <span className="text fw-bold">{ buttonLabel}</span> 
                    </button> 
                )}                                                       
            </div>
            <div className="text-center">
                {children}
            </div>
            </Modal.Body>
        </Modal>
    </>);
}
export default ReviewModal;