import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './api/contact-service';

function App() {
  
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    ...createEmptyContact(),
  });
  
  useEffect(() => { 
      api.get("/").then(({data}) => {
        return data 
          ? setContacts(data)
          : setContacts([])
    });
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
    api.post('/', newContact).then(({data}) => {
      const updatedContacts = [...contacts, data];
      setContacts(updatedContacts);
    })
    setCurrentContact(createEmptyContact());
  };

  const updateContact = (updatedContact) => {
    api.put(`/${updatedContact.id}`, updatedContact).then(({data}) => {
      const updatedContacts = contacts.map((contactItem) =>
      contactItem.id === data.id ? data : contactItem
      );
      setContacts(updatedContacts);
    })
    setCurrentContact(updatedContact);
  };

  const deleteContact = (id) => {
    api.delete(`/${id}`);
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
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