export const updateContact = (updatedContact) => {
    return {
        type:'updateContact',
        payload: updatedContact,
    }
}

export const addContact = (newContact) => {
    return {
        type:'addContact',
        payload: newContact,
    }
}

export const delContact = (id) => {
    return {
        type:'deleteContact',
        payload: id,
    }
}

export const selectEditedContact = (selectedContact) => {
    return {
        type:'selectContact',
        payload: selectedContact,
    }
}

export const createNewContact = () => {
    return {
        type:'clearCurrentContact',
        payload: {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          },
    }
}

export const getContacts = (contacts) => {
    return {
        type:'getContacts',
        payload: contacts,
    }
}