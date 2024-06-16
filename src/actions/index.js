import fetch from 'cross-fetch';

export const pageSize = 20;
const link = 'https://blog.kata.academy/api';

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    page: page
});

export const fetchArticles = (page) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`${link}/articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
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
        return fetch(`${link}/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
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

export const signUp = (data) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`${link}/users`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(json => {
                saveUser(json.user);
                return dispatch(setLogIn());
            })
            .catch((json) => dispatch(setErrorMessage(json)));
    };
};

export const signIn = (data) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`${link}/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: data.email,
                    password: data.password
                }
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(json => {
                saveUser(json.user);
                return  dispatch(setLogIn());
            })
            .catch((json) => dispatch(setErrorMessage(json)));
    };
};

export const updateUser = (data) => {
    return function (dispatch) {
        dispatch(setLoading());
        return fetch(`${link}/user`, {
            method: 'PUT',
            body: JSON.stringify({
                user: {
                    username: data.username,
                    email: data.email,
                    password: data.password !== null ? data.password : undefined,
                    image: data.image  !== null ? data.image : undefined,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(json => {
                saveUser(json.user);
                return  dispatch(setLogIn());
            })
            .catch((error) => dispatch(setErrorMessage(error)));
    };
};

const saveUser = (user) => {
    localStorage.setItem('username', user.username);
    localStorage.setItem('image', user.image);
    localStorage.setItem('token', user.token);
}

const setLogIn = () => ({
    type: 'SET_LOG_IN'
});

const setErrorMessage = (json) => ({
    type: 'SET_ERROR_MESSAGE',
    json
});

export const logOut = () => {
    localStorage.clear();
    return ({
        type: 'LOG_OUT'
    });
};

export const sendFavorite = (slug) => {
    return function (dispatch) {
        return fetch(`${link}/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .catch(() => dispatch(setError()));
    };
};

export const sendUnfavorite = (slug) => {
    return function (dispatch) {
        return fetch(`${link}/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .catch(() => dispatch(setError()));
    };
};

export const postArticle = (data) => {
    return function (dispatch) {
        console.log(data);
        return fetch(`${link}/articles`, {
            method: 'POST',
            body: JSON.stringify({
                article: {
                    title: data.title,
                    description: data.description,
                    body: data.text,
                    tags: data.tags
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .catch(() => dispatch(setError()));
    };
}

export const updateArticle = (data, slug) => {
    return function (dispatch) {
        console.log(data);
        return fetch(`${link}/articles/${slug}`, {
            method: 'PUT',
            body: JSON.stringify({
                article: {
                    title: data.title,
                    description: data.description,
                    body: data.text,
                    tags: data.tags
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .catch(() => dispatch(setError()));
    };
}

export const addTag = (text) => ({
    type: 'ADD_TAG',
    text
});

export const updateTag = (index, text) => ({
    type: 'UPDATE_TAG',
    index,
    text
});

export const deleteTag = (index) => ({
    type: 'DELETE_TAG',
    index
});

export const deleteArticle = (slug) => {
    return function (dispatch) {
        return fetch(`${link}/articles/${slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .catch(() => dispatch(setError()));
    };
}