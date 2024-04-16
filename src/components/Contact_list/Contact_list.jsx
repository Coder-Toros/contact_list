import React, { Component } from 'react';
import Contact from '../Contact_item/Contact_item';
import "./Contact_list.css";
import { nanoid } from 'nanoid';

export class Contact_list extends Component {
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

export default Contact_list;
