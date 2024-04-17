import React, { Component } from 'react';
import './ContactForm.css';
export class ContactForm extends Component {
  state = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

  static getDerivedStateFromProps(props, state) {
    if (props.currentContact.id !== state.id) {
      return {
        ...props.currentContact,
      };
    }
    return null;
  }

  handlerInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  clearInputValue = (e) => {
    const { name } = e.target.previousSibling;
    this.setState({
      [name]: '',
    });
  };

  onDeleteContact = () => {
    this.props.deleteContact(this.state.id);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    if (!this.state.id) {
      this.setState(this.createEmptyContact());
    }
  };

  render() {
    return (
      <form id='contacts-form' onSubmit={this.onFormSubmit}>
        <div className='wrapper-input'>
          <input
            type='text'
            name='firstName'
            value={this.state.firstName}
            onChange={this.handlerInputChange}
            placeholder='First name'
          />
          <span className='delete-btn' onClick={this.clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='text'
            name='lastName'
            value={this.state.lastName}
            onChange={this.handlerInputChange}
            placeholder='Last name'
          />
          <span className='delete-btn' onClick={this.clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handlerInputChange}
            placeholder='Email'
          />
          <span className='delete-btn' onClick={this.clearInputValue}>
            X
          </span>
        </div>
        <div className='wrapper-input'>
          <input
            type='text'
            name='phone'
            value={this.state.phone}
            onChange={this.handlerInputChange}
            placeholder='Phone'
          />
          <span className='delete-btn' onClick={this.clearInputValue}>
            X
          </span>
        </div>
        <button type='submit'>Save</button>
        {this.state.id ? (
          <button type='button' onClick={this.onDeleteContact}>
            Delete
          </button>
        ) : (
          ''
        )}
      </form>
    );
  }
}

export default ContactForm;
