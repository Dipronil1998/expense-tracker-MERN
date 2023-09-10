import React, { useState, useReducer, useContext, useEffect } from "react";
import axios from 'axios';
import Reducer from "./Reducer";
import {
    GET_EXPENSES_BEGIN,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
} from './Action'

const initialState = {
    validCategories: ["Stock", "Mutual fund", "Self", "Other"],
    validPaymentMethod: ["Cash", "Online"],
    validPaymentBank: ["SBI", "HDFC", "ICICI", "INDIAN", "PAYTM"],
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const handelChange = ({ name, value }) => {
        dispatch({
          type: HANDLE_CHANGE,
          payload: {
            name, value
          }
        });
      }

    return (
        <AppContext.Provider
          value={{
            ...state,
            handelChange
          }}
        >
          {children}
        </AppContext.Provider>
      )

}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }