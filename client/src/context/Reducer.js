import {
    CREATE_EXPENSES_SUCCESS,
    GET_EXPENSES_BEGIN,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
    CREATE_EXPENSES_BEGIN,
    DELETE_EXPENSES_BEGIN,
    TOGGLE_MODAL,
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
            expensesData: action.payload.expensesData,
        };
    }
    if (action.type === CREATE_EXPENSES_BEGIN) {
        return {
            ...state,
            isExpensesCreate: false,
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
            showModal: !state.showModal
        }
    }
}

export default Reducer;