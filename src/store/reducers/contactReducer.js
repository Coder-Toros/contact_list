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

export default function contactsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contactItem) =>
          contactItem.id === payload.id ? payload : contactItem
        ),
      };

    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, payload],
        currentContact: createEmptyContact(),
      };

    case 'DELETE_CONTACT':
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

    case 'SELECT_CONTACT':
      return {
        ...state,
        currentContact: payload,
      };

    case 'CREATE_NEW_CONTACT':
      return {
        ...state,
        currentContact: createEmptyContact(),
      };

    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: payload,
      };

    default:
      return state;
  }
}
