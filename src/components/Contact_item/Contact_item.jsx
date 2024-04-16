import { Component } from 'react';
import './Contact_item.css';
export class Contact extends Component {
  onContactDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };
   
  selectEditedContact = (e) => {
    e.stopPropagation();
    this.props.selectContact(this.props.contact)
  }

  render() {
    return (
      <div
        className='contact'
      >
        <p 
          className='content'
          onDoubleClick={this.selectEditedContact}  
        >
            {this.props.contact.firstName} {this.props.contact.lastName}
        </p>
        <span 
            className='delete-btn' 
            onClick={this.onContactDelete}
            >
            X
        </span>
      </div>
    );
  }
}

export default Contact;
