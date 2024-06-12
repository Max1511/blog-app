import { pageSize } from '../actions';

const ArticlesReducer = (state = {
    articles: [],
    article: {},
    totalPages: 1,
    page: 1,
    pageSize: pageSize,
    isLoading: true,
    isError: false
}, action) => {
    switch (action.type) {
    case 'CHANGE_PAGE':
        return {
            ...state,
            page: action.page,
        }
    case 'SET_LOADING':
        return {
            ...state,
            isLoading: true
        }
    case 'RECEIVE_ARTICLES':
        return {
            ...state,
            articles: action.json.articles,
            page: action.page,
            totalPages: action.json.articlesCount,
            isLoading: false
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
            isError: true
        };
    default:
        return state;
    }
};

export default ArticlesReducer;