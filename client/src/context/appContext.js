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
    const baseUrl = "http://localhost:3001/api/v1"

    const handelChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value
            }
        });
    }

    // const getAllExpenses = async (fromDate,toDate) => {
    //     // dispatch({ type: GET_EXPENSES_BEGIN });
    //     try {
    //         let url;
    //         if(fromDate && toDate){
    //             url = `${baseUrl}/expenses?from=${fromDate.format("YYYY-MM-DD")}&to=${toDate.format("YYYY-MM-DD")}`
    //         } else{
    //             url = `${baseUrl}/expenses`
    //         }
    //         const expensesResponse = await axios.get(url);
    //         dispatch({
    //             type: GET_EXPENSES_SUCCESS,
    //             payload: {
    //                 expensesData: expensesResponse.data.response,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const getAllExpenses = async (selectedDates) => {
        // dispatch({ type: GET_EXPENSES_BEGIN });
        try {
            let url;
            if(selectedDates.length > 0){
                url = `${baseUrl}/expenses?from=${selectedDates[0].format("YYYY-MM-DD")}&to=${selectedDates[1].format("YYYY-MM-DD")}`
            } else{
                url = `${baseUrl}/expenses`
            }
            const expensesResponse = await axios.get(url);
            dispatch({
                type: GET_EXPENSES_SUCCESS,
                payload: {
                    expensesData: expensesResponse.data.response,
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
        // if (selectedDates.length === 2) {
        //     getAllExpenses(selectedDates[0],selectedDates[1]);
        // } else {
        //     getAllExpenses();
        // }
        getAllExpenses(selectedDates)
    }, [state,selectedDates])

    return (
        <AppContext.Provider
            value={{
                ...state,
                handelChange,
                getAllExpenses,
                createExpenses,
                selectedDates,
                setSelectedDates,
                tempSelectedDates,
                setTempSelectedDates,
                deleteExpenses,
                toggleModal
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