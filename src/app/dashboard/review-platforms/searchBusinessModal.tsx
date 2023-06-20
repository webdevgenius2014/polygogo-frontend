import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import SearchBusiness from "./searchBusinessForm";
import Modal from 'react-bootstrap/Modal';
type Props={
    modalId:any;
    message:any;
    setMessage:(val:any)=>void; 
    isshowbusinessModal:any; 
    closeBusinessModal:any  
    buttonAction:(val:any)=>void; 
};
const SearchBusinessModal:React.FC<Props>=({message, setMessage, isshowbusinessModal, buttonAction, closeBusinessModal, modalId})=>{
    return(
        <Modal show={isshowbusinessModal} onHide={closeBusinessModal} backdrop={true} centered className={`${dstyles.custom_modal}`} id={modalId}>
            <Modal.Header closeButton>
                <h5 className="modal-title" id="SearchLocationModalLabel">
                    <img src="/dashboard/icons/google.svg" alt="google" />
                    <span className="ms-2">Google</span>
                </h5>
            </Modal.Header>
            <Modal.Body className={`${dstyles.search_business}`}>
                <SearchBusiness  message={message} setMessage={setMessage} savePlatform={buttonAction} />
            </Modal.Body>
        </Modal>
    );
}
export default SearchBusinessModal;