import { ReactNode } from "react"
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
export type childrenType = ReactNode;
type ModalProps={
    children?: childrenType;
    modalId:string;
    isopen:boolean;    
    closeModal?:(val:any)=>void;
    platformName:string;
    buttonLabel:string;
    buttonAction:(val:any)=>void;
}
const ReviewModal: React.FC<ModalProps>=({modalId, isopen, closeModal, buttonLabel, buttonAction, platformName, children})=>{
    const handleReview=()=>{
        buttonAction;
        //closeModal;
    }
    console.log(isopen);
    return(
        <div className={`modal fade ${isopen===true?'show':''}`} id={modalId} tabIndex={-1} aria-labelledby="ReviewModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ReviewModalLabel">Connect With {platformName} </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <button type="button" className={`${dstyles.btn} ${dstyles.btn_primary}`} aria-label="review-btn" onClick={()=>handleReview()}>{ buttonLabel} </button>
                        {children}
                    </div>               
                </div>
            </div>
        </div>
    );
}
export default ReviewModal;