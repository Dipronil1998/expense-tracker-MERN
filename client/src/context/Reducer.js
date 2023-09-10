import {
    GET_EXPENSES_BEGIN,
    GET_EXPENSES_SUCCESS,
    HANDLE_CHANGE,
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
}

export default Reducer;