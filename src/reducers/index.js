import { combineReducers } from 'redux';

import ArticlesReducer from './ArticlesReducer';
import ArticleReducer from './ArticleReducer';
import ArticleFormReducer from './ArticleFormReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    ArticlesReducer,
    ArticleReducer,
    ArticleFormReducer,
    UserReducer
});