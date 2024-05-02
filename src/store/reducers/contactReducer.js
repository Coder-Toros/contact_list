import { contactsState } from '../../model/initialContacts';

const initialState = {
  contacts: contactsState,
  currentContact: createEmptyContact(),
};

function createEmptyContact() {
  return {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
}

export default function contactsReduser(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'updateContact':
      return {
          ...state,
          contacts: state.contacts.map((contactItem) =>
            contactItem.id === payload.id ? payload : contactItem
          ),
          currentContact: state.currentContact,
        };
        
        case 'addContact': 
        
       return {
            ...state,
            contacts: [...state.contacts, payload],
            currentContact: createEmptyContact(),
          }

    case 'deleteContact':
      return {
        ...state,
        contacts: state.contacts.filter(
          (contactItem) => contactItem.id !== payload
        ),
        currentContact:
          payload === state.currentContact.id
            ? createEmptyContact()
            : state.currentContact,
      };

    case 'selectContact':
      return {
        ...state,
        currentContact: payload,
      };

    case 'clearCurrentContact':
      return {
        ...state,
        currentContact: createEmptyContact(),
      };

    case 'getContacts':
      return {
        ...state,
        contacts: payload,
      };

    default:
      return state;
  }
}
