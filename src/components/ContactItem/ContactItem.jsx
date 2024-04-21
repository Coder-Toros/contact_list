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

export default ContactItem;