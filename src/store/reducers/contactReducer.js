import { contactsState } from '../../model/initialContacts';
import ACTION_TYPES from '../actions/actionTypes';

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
    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contactItem) =>
          contactItem.id === payload.id ? payload : contactItem
        ),
      };

    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        currentContact: createEmptyContact(),
      };

    case ACTION_TYPES.DELETE_CONTACT:
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

    case ACTION_TYPES.SELECT_CONTACT:
      return {
        ...state,
        currentContact: payload,
      };

    case ACTION_TYPES.CREATE_NEW_CONTACT:
      return {
        ...state,
        currentContact: createEmptyContact(),
      };

    case ACTION_TYPES.GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };

    default:
      return state;
  }
}
