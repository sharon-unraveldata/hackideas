import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function BaseModal({children, open}) {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);

useEffect(()=>{
 setShow(open);
},[open])

 return (
	  <>
      <Modal show={show} >
        { children }
      </Modal>
	  </>
 )
}
export default BaseModal;