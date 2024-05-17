import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactsState } from "../../model/initialContacts";
import { CONTACT_SLICE_NAME } from "../../constants/constants";
import api from '../../api/contact-service'

const initialState = {
    contacts: contactsState,
    currentContact: createEmptyContact(),
    isFetching: false,
    error: null,
}

// Create template functions

function createEmptyContact() {
    return {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };
}

const setError = (state, action) => {
    state.isFetching = false;
    state.error= action.payload;
}
const setFetching = (state) => {
    state.isFetching = true;
    state.error= null;
}
// =================================

// Create middleware async functions

export const getContacts = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/getContacts`,
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(`/${CONTACT_SLICE_NAME}`);
            if(response.status >= 400) {
                throw new Error(`Error status is ${response.status}`)
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const delContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/delContact`,
    async (id,{rejectWithValue, dispatch}) => {
        try {
            const response = await api.delete(`/${CONTACT_SLICE_NAME}/${id}`);
            if(response.status >= 400) {
                throw new Error(`Cannot delete contact. Error status is ${response.status}`)
            }
            dispatch(removeContact(id))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/addContact`,
    async (contact,{rejectWithValue}) => {
        try {
            const response = await api.post(`/${CONTACT_SLICE_NAME}`, contact);
            if(response.status >= 400) {
              throw new Error(`Cannot add contact. Error status is ${response.status}`)
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/updateContact`,
    async (contact,{rejectWithValue}) => {
        try {
            const response = await api.put(`/${CONTACT_SLICE_NAME}/${contact.id}`, contact);
            if(response.status >= 400) {
              throw new Error(`Cannot update contact. Error status is ${response.status}`)
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// =====================================================

// Create slice for work with "contacts" enterprise logic

const contactSlice = createSlice({
    name: CONTACT_SLICE_NAME,
    initialState,
    reducers: {
        removeContact(state, {payload}) {
            state.contacts = [
                ...state.contacts.filter(
                    (contactItem) => contactItem.id !== payload
            )]
            state.currentContact = payload === state.currentContact.id
                                    ? createEmptyContact()
                                    : state.currentContact;
        },
        selectContact(state, {payload}) {
            state.currentContact = payload
        },
        createNewContact(state) {
            state.currentContact = createEmptyContact()
        },
    },
    extraReducers: (billder) => {
        // Get all contacts 

        billder.addCase(getContacts.fulfilled, (state, {payload}) => {
            state.contacts = payload;
            state.isFetching = false;
            state.error = null;
        })
        billder.addCase(getContacts.pending, setFetching)
        billder.addCase(getContacts.rejected, setError)

        // Add new contact

        billder.addCase(addContact.fulfilled, (state, {payload}) => {
            state.contacts.push(payload);
            state.currentContact = createEmptyContact();
            state.isFetching = false;
            state.error = null;
        })
        billder.addCase(addContact.pending, setFetching)
        billder.addCase(addContact.rejected, setError)

        // Update an existing contact

        billder.addCase(updateContact.fulfilled, (state, {payload}) => {
            state.contacts = state.contacts.map((contactItem) => contactItem.id === payload.id 
                        ? payload 
                        : contactItem
            );
            state.isFetching = false;
            state.error = null;
        })
        billder.addCase(updateContact.pending, setFetching)
        billder.addCase(updateContact.rejected, setError)

        // Delete contact

        billder.addCase(delContact.pending, setFetching)
        billder.addCase(delContact.rejected, setError)
  
    }
})

// ===================================================================

const {actions, reducer} = contactSlice;

const {removeContact} = actions;

export const {selectContact, createNewContact} = actions;

export default reducer
