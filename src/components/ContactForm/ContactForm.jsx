import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delContact, addContact, updateContact } from '../../store/slices/contactSlice';

// import api from '../../api/contact-service';

import './ContactForm.css';

function ContactForm() {
  const dispatch = useDispatch();
  const currentContact = useSelector((state) => state.contactList.currentContact);
  const [formContact, setFormContact] = useState(currentContact)
  
  useEffect(() => {
    setFormContact(currentContact)
  }, [currentContact])

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    setFormContact({
      ...formContact,
      [name]: value,
    });
  };

  const clearInputValue = (e) => {
    const { name } = e.target.previousSibling;
    setFormContact({
      ...formContact,
      [name]: '',
    });
  };

  const onDeleteContact = () => {
    dispatch(delContact(formContact.id))
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    formContact.id
      ? dispatch(updateContact(formContact))
      : dispatch(addContact(formContact));
  };

    return (
      <form id='contacts-form' onSubmit={onFormSubmit}>
        <div className='wrapper-input'>
          <input
            type='text'
            name='firstName'
            value={formContact.firstName}
            onChange={handlerInputChange}
            placeholder='First name'
          />
          <span className='delete-btn' onClick={clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='text'
            name='lastName'
            value={formContact.lastName}
            onChange={handlerInputChange}
            placeholder='Last name'
          />
          <span className='delete-btn' onClick={clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='email'
            name='email'
            value={formContact.email}
            onChange={handlerInputChange}
            placeholder='Email'
          />
          <span className='delete-btn' onClick={clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='text'
            name='phone'
            value={formContact.phone}
            onChange={handlerInputChange}
            placeholder='Phone'
          />
          <span className='delete-btn' onClick={clearInputValue}>
            X
          </span>
        </div>
        <button type='submit'>Save</button>
        {formContact.id && <button type='button' onClick={onDeleteContact}>
            Delete
          </button>
        }
      </form>
    );
}

export default ContactForm;