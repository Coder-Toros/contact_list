import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slices/contactSlice";
import logger from "redux-logger";

export default configureStore({
    reducer: {
        contactList: contactReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})