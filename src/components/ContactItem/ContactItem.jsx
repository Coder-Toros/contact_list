import { useDispatch } from 'react-redux';
import {delContact, selectContact} from '../../store/slices/contactSlice'
import './ContactItem.css';

function ContactItem({contact}) {
  const dispatch = useDispatch();

  const onContactDelete = (e) => {
    e.stopPropagation();
    dispatch(delContact(contact.id));
  };
   
  const selectEditedContact = (e) => {
    e.stopPropagation();
    dispatch(selectContact(contact))
  }
  
  return (
    <div
      className='contact'
    >
      <p 
        className='content'
        onDoubleClick={selectEditedContact}  
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