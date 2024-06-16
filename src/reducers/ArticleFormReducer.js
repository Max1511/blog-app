const ArticleFormReducer = (state = {
    article: {},
    tags: [],
    isLoading: true,
    isError: false
}, action) => {
    switch (action.type) {
    case 'SET_LOADING':
        return {
            ...state,
            isLoading: true,
            isError: false
        };
    case 'RECEIVE_ARTICLE':
        return {
            ...state,
            article: action.json.article,
            isLoading: false,
            isError: false
        };
    case 'ADD_TAG':
        const newTags = state.tags;
        newTags.push(action.text);
        return {
            ...state,
            tags: newTags
        };
    case 'DELETE_TAG':
        const newTagsByDelete = [
            ...state.tags.slice(0, action.index),
            ...state.tags.slice(action.index + 1)
        ];
        return {
            ...state,
            tags: newTagsByDelete
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

export default ArticleFormReducer;