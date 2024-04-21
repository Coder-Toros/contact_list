import PropTypes from 'prop-types';
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
ContactList.propTypes = {
  createNewContact: PropTypes.func.isRequired,
  contactsList: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  selectContact: PropTypes.func.isRequired,
}

ContactList.defaultProps = {
  contactsList: [],
}

export default ContactList;