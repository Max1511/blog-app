import { combineReducers } from 'redux';

import ArticlesReducer from './ArticlesReducer';
import ArticleReducer from './ArticleReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    ArticlesReducer,
    ArticleReducer,
    UserReducer
});