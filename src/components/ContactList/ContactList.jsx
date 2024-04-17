import React, { Component } from 'react';
import Contact from '../ContactItem/ContactItem';
import "./ContactList.css";
import { nanoid } from 'nanoid';

export class ContactList extends Component {
  render() {
    return (
      <>
        {this.props.contactsList.map((contact) => {
          return (
              <Contact
                key={nanoid()} 
                contact={contact} 
                onDelete={this.props.onDelete}
                selectContact={this.props.selectContact}
              />
          );
        })}
        <button 
          onClick={this.props.createNewContact}
          className='btn'
        >
        New
        </button>
      </>
    );
  }
}

export default ContactList;
