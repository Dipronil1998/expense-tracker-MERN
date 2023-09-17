import React, { useState, useReducer, useContext, useEffect } from "react";
import axios from 'axios';
import Reducer from "./Reducer";
import {
    CREATE_EXPENSES_SUCCESS,
    GET_EXPENSES_BEGIN,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
    CREATE_EXPENSES_BEGIN,
    DELETE_EXPENSES_BEGIN,
    TOGGLE_MODAL,
} from './Action'

const initialState = {
    isEditing: false,
    expensesData: [],
    cardData: [],
    validCategories: ["Stock", "Mutual fund", "Self", "Other"],
    validPaymentMethod: ["Cash", "Online"],
    validPaymentBank: ["SBI", "HDFC", "ICICI", "INDIAN", "PAYTM"],
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
    const baseUrl = "http://localhost:3001/api/v1"

    const getAllExpenses = async (selectedDates, selectedCategoryFilter) => {
        // dispatch({ type: GET_EXPENSES_BEGIN });
        try {
            console.log(selectedCategoryFilter.length,"selectedCategoryFilter");
            let url=`${baseUrl}/expenses?`;
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
            getAllExpenses(selectedDates,selectedCategoryFilter);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteExpenses = async (id) => {
        dispatch({ type: DELETE_EXPENSES_BEGIN })
        try {
            let url = `${baseUrl}/expenses/${id}`;
            await axios.delete(url);
            getAllExpenses(selectedDates);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleModal = () => {
        dispatch({ type: TOGGLE_MODAL })
    }

    useEffect(() => {
        getAllExpenses(selectedDates,selectedCategoryFilter)
    }, [selectedDates,selectedCategoryFilter])

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