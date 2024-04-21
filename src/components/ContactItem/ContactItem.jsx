import PropTypes from 'prop-types';
import './ContactItem.css';

function ContactItem({onDelete, selectContact, contact}) {
  const onContactDelete = (e) => {
    e.stopPropagation();
    onDelete(contact.id);
  };
   
  const selectEditedContact = (e) => {
    e.stopPropagation();
    selectContact(contact)
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

ContactItem.propTypes = {
  contact: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  selectContact: PropTypes.func.isRequired,
}

export default ContactItem;