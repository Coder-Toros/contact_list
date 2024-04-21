import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

function App() {
  
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    ...createEmptyContact(),
  });
  
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(contacts);
  }, []);

  function createEmptyContact() {
    return {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }

  const saveContact = (contact) => {
    contact.id 
    ? updateContact(contact) 
    : addContact(contact);
  };

  const addContact = (newContact) => {
    newContact.id = nanoid();
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    setCurrentContact(createEmptyContact());
    saveContactToStorage(updatedContacts);
  };

  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map((item) =>
      item.id === updatedContact.id ? updatedContact : item
    );
    setContacts(updatedContacts);
    setCurrentContact(updatedContact);
    saveContactToStorage(updatedContacts);
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    saveContactToStorage(updatedContacts);
    setContacts(updatedContacts);
    id === currentContact.id
      ? setCurrentContact(createEmptyContact())
      : setCurrentContact(currentContact);
  };

  const createNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  const selectEditedContact = (contact) => {
    setCurrentContact(contact);
  };

  const saveContactToStorage = (arrContacts) => {
    localStorage.setItem('contacts', JSON.stringify(arrContacts));
  };

  return (
    <div className='container'>
      <h1>Contact list</h1>
      <div className='wrapper'>
        <div className='contacts-wrapper'>
          <ContactList
            contactsList={contacts}
            createNewContact={createNewContact}
            onDelete={deleteContact}
            selectContact={selectEditedContact}
          />
        </div>
        <ContactForm
          createEmptyContact={createEmptyContact}
          onSubmit={saveContact}
          deleteContact={deleteContact}
          currentContact={currentContact}
        />
      </div>
    </div>
  );
}

export default App;