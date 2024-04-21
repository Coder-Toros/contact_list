import Contact from '../ContactItem/ContactItem';
import "./ContactList.css";

function ContactList({contactsList, onDelete, selectContact, createNewContact}) {
    return (
      <>
        {contactsList.map((contact) => {
          return (
              <Contact
                key={contact.id} 
                contact={contact} 
                onDelete={onDelete}
                selectContact={selectContact}
              />
          );
        })}
        <button 
          onClick={createNewContact}
          className='btn'
        >
        New
        </button>
      </>
    );
}

export default ContactList;