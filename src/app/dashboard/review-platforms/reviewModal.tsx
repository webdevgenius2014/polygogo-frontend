import { ReactNode, useState, useRef, useEffect } from "react"
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleButton from './googleButton';
import FacebookButton from "./facebookButton";
import GlassDoorButton from "./glassdoorButton";
import SearchBusiness from "./searchBusinessForm";
export type childrenType = ReactNode;
type ModalProps={
    children?: childrenType;
    modalId:string;
    currentRef:any
    setCurrentRef:(val:any)=>void;
    isopen:boolean;    
    closeModal?:(val:any)=>void;
    platformName:string;
    buttonLabel:string;
    buttonAction:(val:any)=>void;
    icon:(any);      
    message:any;
    setMessage:(val:any)=>void;  
}
const ReviewModal: React.FC<ModalProps>=({modalId, currentRef, setCurrentRef, isopen, closeModal, buttonLabel, buttonAction, platformName, icon, message, setMessage, children})=>{
    const clientId= process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;  
    // const modalOne= useRef(null);  
    // const modalTwo= useRef(null);      
    const handleReview=()=>{
        // buttonAction;
    }    
    return(<>
        <div  className={`modal fade ${isopen===true?'show':''} ${dstyles.custom_modal}`} id={modalId} tabIndex={-1} aria-labelledby="ReviewModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ReviewModalLabel">Connect With {platformName} </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center mb-4">                           
                            {platformName ==='Google' && clientId && (<> 
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleButton message={message} setMessage={setMessage} savePlatform={buttonAction}  />
                                </GoogleOAuthProvider>
                                <p className="mt-4">Don't have google business listing access? <span data-bs-target="#SearchLocationModal" data-bs-toggle="modal" data-bs-dismiss="modal" className={dstyles.link} onClick={()=>setCurrentRef(modalTwo)}>click here </span></p>
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
                    </div>               
                </div>
            </div>
        </div>

        <div className={`modal fade modal-lg ${isopen===true?'show':''} ${dstyles.custom_modal}`} id='SearchLocationModal' tabIndex={-1} aria-labelledby="SearchLocationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="SearchLocationModalLabel">
                            <img src="/dashboard/icons/google.svg" alt="google" />
                            <span className="ms-2">Google</span>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${dstyles.search_business}`}>
                        <SearchBusiness  message={message} setMessage={setMessage} savePlatform={buttonAction} />
                    </div>               
                </div>
            </div>
        </div>        
    </>);
}
export default ReviewModal;