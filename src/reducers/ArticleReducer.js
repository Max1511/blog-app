const ArticleReducer = (state = {
    article: {},
    isLoading: true,
    isError: false
}, action) => {
    switch (action.type) {
    case 'SET_LOADING':
        return {
            ...state,
            isLoading: true
        };
    case 'RECEIVE_ARTICLE':
        return {
            ...state,
            article: action.json.article,
            isLoading: false
        };
    case 'SET_ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true
        };
    default:
        return state;
    }
};

export default ArticleReducer;