import ACTION_TYPES from "./actionTypes"

export const updateContact = (updatedContact) => {
    return {
        type: ACTION_TYPES.UPDATE_CONTACT,
        payload: updatedContact,
    }
}

export const addContact = (newContact) => {
    return {
        type: ACTION_TYPES.ADD_CONTACT,
        payload: newContact,
    }
}

export const delContact = (id) => {
    return {
        type: ACTION_TYPES.DELETE_CONTACT,
        payload: id,
    }
}

export const selectEditedContact = (selectedContact) => {
    return {
        type: ACTION_TYPES.SELECT_CONTACT,
        payload: selectedContact,
    }
}

export const createNewContact = (payload) => {
    return {
        type: ACTION_TYPES.CREATE_NEW_CONTACT,
        payload,
    }
}

export const getContacts = (contacts) => {
    return {
        type: ACTION_TYPES.GET_CONTACTS,
        payload: contacts,
    }
}