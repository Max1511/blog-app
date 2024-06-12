import fetch from 'cross-fetch';

export const pageSize = 20;

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    page: page
});

export const fetchArticles = (page) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`https://blog.kata.academy/api/articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`)
            .then(response => response.json())
            .then(json => {
                return  dispatch(receiveArticles(json, page));
            })
            .catch(() => dispatch(setError()));
    };
};

export const fetchArticle = (slug) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`https://blog.kata.academy/api/articles/${slug}`)
            .then(response => response.json())
            .then(json => {
                return  dispatch(receiveArticle(json));
            })
            .catch(() => dispatch(setError()));
    };
};

const setLoading = () => ({
    type: 'SET_LOADING',
});

const receiveArticles = (json, page) => ({
    type: 'RECEIVE_ARTICLES',
    json,
    page
});

const receiveArticle = (json) => ({
    type: 'RECEIVE_ARTICLE',
    json
});

const setError = () => ({
    type: 'SET_ERROR'
});