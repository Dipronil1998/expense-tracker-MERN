import React, { useState, useReducer, useContext, useEffect } from "react";
import axios from 'axios';
import Reducer from "./Reducer";
import {
    CREATE_EXPENSES_SUCCESS,
    GET_EXPENSES_SUCCESS,
    CREATE_EXPENSES_BEGIN,
    DELETE_EXPENSES_BEGIN,
    TOGGLE_MODAL,
    SET_EDIT_EXPENSES,
    UPDATE_EXPENSES_SUCCESS,
    GET_EXPENSES_BEGIN,
} from './Action'

const initialState = {
    isLoading: false,
    isEditing: false,
    expensesData: [],
    cardData: [],
    expenses: "",
    validCategories: ["Stock", "Mutual fund", "Self", "Other"],
    validPaymentMethod: ["Cash", "Online"],
    validPaymentBank: ["SBI", "HDFC", "ICICI", "INDIAN", "PAYTM"],
    validType: ["Credits", "Debits"],
    validIncomeCategories: ["Profit", "Dividend", "Interest", "Salary", "Freelancing", "Stock", "Mutual fund", "Other"],
    alertType: "",
    alertText: "",
    isExpensesCreate: false,
    showModal: false
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [selectedDates, setSelectedDates] = useState([]);
    const [tempSelectedDates, setTempSelectedDates] = useState([]);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
    const [tempSelectedCategoryFilter, setTempSelectedCategoryFilter] = useState([]);

    let baseUrl;
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        baseUrl = "http://localhost:3001/api/v1";
    } else {
        baseUrl = "https://dipronil-expense-app.onrender.com/api/v1";
    }

    const getAllExpenses = async (selectedDates, selectedCategoryFilter) => {
        dispatch({ type: GET_EXPENSES_BEGIN });
        try {
            let url = `${baseUrl}/expenses?`;
            if (selectedDates.length > 0) {
                url = url + `from=${selectedDates[0].format("YYYY-MM-DD")}&to=${selectedDates[1].format("YYYY-MM-DD")}`
            }
            if (selectedCategoryFilter.length > 0) {
                const categoryFilterString = JSON.stringify(selectedCategoryFilter);
                url = url + `&categoryFilter=${categoryFilterString}`;
            }
            const expensesResponse = await axios.get(url);
            dispatch({
                type: GET_EXPENSES_SUCCESS,
                payload: {
                    expensesData: expensesResponse.data.response,
                    cardData: expensesResponse.data.cardResponse,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const createExpenses = async (values) => {
        dispatch({ type: CREATE_EXPENSES_BEGIN });
        try {
            const url = `${baseUrl}/expenses`;
            const expensesResponse = await axios.post(url, values);
            dispatch({
                type: CREATE_EXPENSES_SUCCESS,
                payload: {
                    expensesData: expensesResponse.data.message,
                },
            });
            getAllExpenses(selectedDates, selectedCategoryFilter);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteExpenses = async (id) => {
        dispatch({ type: DELETE_EXPENSES_BEGIN })
        try {
            let url = `${baseUrl}/expenses/${id}`;
            await axios.delete(url);
            getAllExpenses(selectedDates, selectedCategoryFilter);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleModal = () => {
        dispatch({ type: TOGGLE_MODAL })
    }

    const setEditExpenses = async (id) => {
        // dispatch({ type: SET_EDIT_EXPENSES })
        try {
            let url = `${baseUrl}/expenses/${id}`;
            const response = await axios.get(url);
            dispatch({
                type: SET_EDIT_EXPENSES,
                payload: {
                    expenses: response.data.response
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateExpenses = async (values) => {
        // dispatch({ type: CREATE_EXPENSES_BEGIN });
        try {
            const { _id, createdAt, updatedAt, __v, ...newValues } = values;
            const url = `${baseUrl}/expenses/${_id}`;
            await axios.put(url, newValues);
            dispatch({
                type: UPDATE_EXPENSES_SUCCESS,
            });
            getAllExpenses(selectedDates, selectedCategoryFilter);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllExpenses(selectedDates, selectedCategoryFilter)
    }, [selectedDates, selectedCategoryFilter])

    return (
        <AppContext.Provider
            value={{
                ...state,
                getAllExpenses,
                createExpenses,
                selectedDates,
                setSelectedDates,
                tempSelectedDates,
                setTempSelectedDates,
                deleteExpenses,
                toggleModal,
                selectedCategoryFilter,
                setSelectedCategoryFilter,
                tempSelectedCategoryFilter,
                setTempSelectedCategoryFilter,
                setEditExpenses,
                updateExpenses
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