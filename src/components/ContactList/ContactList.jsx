import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import api from '../../api/contact-service';
import {getContacts, createNewContact} from '../../store/actions/contactActions'
import "./ContactList.css";
import ContactItem from '../ContactItem/ContactItem';

function ContactList() {
  
  const dispatch = useDispatch();
  const contactsList = useSelector((state) => state.contacts);

  const createContact = () => {
    dispatch(createNewContact())
  }

  useEffect(() => {
    api.get('/').then(({data}) => dispatch(getContacts(data)))
  }, [dispatch])

    return (
      <>
        {contactsList.map((contact) => {
          return (
              <ContactItem
                key={contact.id} 
                contact={contact}
              />
          );
        })}
        <button 
          onClick={createContact}
          className='btn'
        >
        New
        </button>
      </>
    );
}

export default ContactList;