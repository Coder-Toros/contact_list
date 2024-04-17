import { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    currentContact: this.createEmptyContact(),
  };

  createEmptyContact() {
    return {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }

  componentDidMount(){
    const contacts = JSON.parse(localStorage.getItem('contacts'))
    if(!contacts) {
      this.setState({
        contacts: [this.createEmptyContact()]
      })
    } else {
      this.setState({
        contacts: [...contacts]
      })
    }
  }

  saveContact = (contact) => {
    contact.id 
    ? this.updateContact(contact)
    : this.addContact(contact);
  }

  addContact = (contact) => {
    contact.id = nanoid();
    this.setState((state) => {
      const contacts = [...state.contacts, contact];
      this.saveContactToStorage(contacts);
      return {
        contacts,
      };
    });
  };

  updateContact = (contact) => {
    this.setState((state)=> {
      const contacts = state.contacts.map(
        (item) => item.id === contact.id
        ? contact 
        : item);
        this.saveContactToStorage(contacts);
        return {
          contacts,
          currentContact: contact,
        };
    })
  }
  
  deleteContact = (id) => {
    this.setState((state) => {
      const contacts = state.contacts.filter(
        (contact) => contact.id !== id);
        this.saveContactToStorage(contacts);
      
      return{
        contacts: contacts,
        currentContact: id === this.state.currentContact.id
        ? this.createEmptyContact()
        : this.state.currentContact,
      }
    });
  };

  createNewContact = () => {
    this.setState({
      currentContact: this.createEmptyContact(),
    })
  };

  selectEditedContact = (contact) => {
    this.setState({
        currentContact: contact,
      })
    };

  saveContactToStorage = (arrContacts) => {
    localStorage.setItem('contacts', JSON.stringify(arrContacts));
  };

  render() {
    return (
      <div className='container'>
        <h1>Contact list</h1>
        <div className='wrapper'>
          <div className='contacts-wrapper'>
            <ContactList
              contactsList={this.state.contacts}
              createNewContact={this.createNewContact}
              onDelete={this.deleteContact}
              selectContact={this.selectEditedContact}
            />
          </div>
          <ContactForm 
            onSubmit={this.saveContact} 
            deleteContact={this.deleteContact}
            currentContact={this.state.currentContact} 
          />
        </div>
      </div>
    );
  }
}

export default App;