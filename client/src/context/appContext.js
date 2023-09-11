import React, { useState, useReducer, useContext, useEffect } from "react";
import axios from 'axios';
import Reducer from "./Reducer";
import {
    GET_EXPENSES_BEGIN,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
} from './Action'

const initialState = {
    isEditing: false,
    expensesData: [],
    validCategories: ["Stock", "Mutual fund", "Self", "Other"],
    validPaymentMethod: ["Cash", "Online"],
    validPaymentBank: ["SBI", "HDFC", "ICICI", "INDIAN", "PAYTM"],
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const baseUrl = "http://localhost:3001/api/v1"

    const handelChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value
            }
        });
    }

    const getAllExpenses = async () => {
        // dispatch({ type: GET_EXPENSES_BEGIN });
        try {
            const url = `${baseUrl}/expenses`
            const expensesResponse = await axios.get(url);
            dispatch({
                type: GET_EXPENSES_SUCCESS,
                payload: {
                    expensesData: expensesResponse.data.response,
                },
            });
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllExpenses()
    }, [])

    return (
        <AppContext.Provider
            value={{
                ...state,
                handelChange,
                getAllExpenses
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