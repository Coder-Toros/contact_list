import { useDispatch } from 'react-redux';
import api from '../../api/contact-service';
import {delContact, selectEditedContact} from '../../store/actions/contactActions'
import './ContactItem.css';

function ContactItem({contact}) {
  const dispatch = useDispatch();

  const onContactDelete = (e) => {
    e.stopPropagation();
    api.delete(`/${contact.id}`)
    dispatch(delContact(contact.id));
  };
   
  const selectContact = (e) => {
    e.stopPropagation();
    dispatch(selectEditedContact(contact))
  }
  
  return (
    <div
      className='contact'
    >
      <p 
        className='content'
        onDoubleClick={selectContact}  
      >
        {contact.firstName} {contact.lastName}
      </p>
      <span 
        className='delete-btn' 
        onClick={onContactDelete}
      >
        X
      </span>
    </div>
  );
}

export default ContactItem;