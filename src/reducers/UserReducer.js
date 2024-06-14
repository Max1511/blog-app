;const UserReducer = (state = {
    isLoggedIn: localStorage.getItem('token') !== null,
    isLoading: false,
    isError: false,
    errorMessage: '',
}, action) => {
    switch (action.type) {
    case 'SET_LOG_IN':
        return {
            ...state,
            isLoggedIn: true,
            isLoading: false,
            isError: false
        };
    case 'SET_LOADING':
        return {
            ...state,
            isLoading: false,
            isError: false
        };
    case 'SET_ERROR_MESSAGE':
        return {
            ...state,
            isLoading: false,
            isError: true,
            errorMessage: `${action.json}`
        };
    case 'LOG_OUT':
        return {
            ...state,
            isLoggedIn: false,
        };
    default:
        return state;
    }
};

export default UserReducer;