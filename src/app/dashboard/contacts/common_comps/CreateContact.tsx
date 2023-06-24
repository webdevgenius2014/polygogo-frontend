'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dstyles from '../../../../styles/dashboard/dstyles.module.scss';

export default function CreateContact() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className={`me-2 ${dstyles.btn_secondry} ${dstyles.btn}`} onClick={handleShow}>
                Upload Contact
            </Button>

            <Modal className={`${dstyles.contact_pop}`} centered show={show} onHide={handleClose} contentClassName={`${dstyles.custom_content}`} dialogClassName={`${dstyles.pop_structure}`}>
                <Modal.Header closeButton className={`${dstyles.pop_header}`}>
                   
                </Modal.Header>
                <Modal.Body>
                <h2 className='text-center'>Create a new Contact</h2>
                    <form>
                        <div className='form-group'>
                            <input type='text' placeholder='Name' className={`form-control ${dstyles.name_field}`}/>
                        </div>
                        <div className='form-group'>
                            <input type='number' placeholder='Phone No' className={`form-control ${dstyles.phone_field}`}/>
                        </div>
                        <div className='form-group'>
                            <input type='email' placeholder='Email' className={`form-control ${dstyles.email_field}`}/>
                        </div>
                        <div className='form-group'>
                            <input type='text' placeholder='Add Tags' className={`form-control ${dstyles.tags_field}`}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className={`${dstyles.pop_foot}`}>
                    <Button variant="secondary" onClick={handleClose} className={`${dstyles.btn_secondry} ${dstyles.btn}`}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose} className={`${dstyles.btn_primary} ${dstyles.btn}`}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}