import {
    CREATE_EXPENSES_SUCCESS,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
    CREATE_EXPENSES_BEGIN,
    DELETE_EXPENSES_BEGIN,
    TOGGLE_MODAL,
    SET_EDIT_EXPENSES,
    UPDATE_EXPENSES_SUCCESS,
    GET_EXPENSES_BEGIN,
    DOWNLOAD_EXPENSES_BEGIN,
    DOWNLOAD_EXPENSES_SUCCESS,
    DOWNLOAD_EXPENSES_ERROR,
} from './Action'

const Reducer = (state, action) => {
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value
        };
    }
    if (action.type === GET_EXPENSES_SUCCESS) {
        return {
            ...state,
            isLoading:false,
            expensesData: action.payload.expensesData,
            cardData: action.payload.cardData,
        };
    }
    if (action.type === CREATE_EXPENSES_BEGIN) {
        return {
            ...state,
            isExpensesCreate: false,
            isEditing: false,
        }
    }
    if (action.type === CREATE_EXPENSES_SUCCESS) {
        return {
            ...state,
            showModal: !state.showModal,
            isExpensesCreate: true,
            alertType: "success",
            alertText: 'Expenses create successfully.',
        }
    }
    if (action.type === DELETE_EXPENSES_BEGIN) {
        return {
            ...state,
        }
    }
    if (action.type === TOGGLE_MODAL) {
        return {
            ...state,
            showModal: !state.showModal,
            expenses:"",
            isEditing: false,
        }
    }
    if (action.type === SET_EDIT_EXPENSES) {
        return {
            ...state,
            isEditing: true,
            showModal: !state.showModal,
            expenses: action.payload.expenses
        }
    }
    if (action.type === UPDATE_EXPENSES_SUCCESS) {
        return {
            ...state,
            isEditing: false,
            showModal: !state.showModal,
            expenses: ""
        }
    }
    if (action.type === GET_EXPENSES_BEGIN) {
        return {
            ...state,
            isLoading:true,
        }
    }
    if (action.type === DOWNLOAD_EXPENSES_BEGIN) {
        return {
            ...state,
            isLoading:true,
        }
    }
    if (action.type === DOWNLOAD_EXPENSES_SUCCESS) {
        return {
            ...state,
            isLoading:false,
        }
    }
}

export default Reducer;