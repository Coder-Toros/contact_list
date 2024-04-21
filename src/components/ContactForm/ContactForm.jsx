import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

function ContactForm({onSubmit, deleteContact, currentContact, createEmptyContact}) {

  const [formContact, setFormContact] = useState({...createEmptyContact()})
  
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
    deleteContact(formContact.id);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formContact);
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
        {formContact.id ? (
          <button type='button' onClick={onDeleteContact}>
            Delete
          </button>
        ) : (
          ''
        )}
      </form>
    );
}

ContactForm.propTypes = {
  createEmptyContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  selectContact: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  currentContact: PropTypes.object,
}

export default ContactForm;