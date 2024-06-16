import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import FullArticle from '../FullArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import ArticleForm from '../ArticleForm';
import EditArticleForm from '../EditArticleForm';
import './App.scss';

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<ArticlesList/>} exact/>
                <Route path='/articles' element={<ArticlesList/>} exact/>
                    <Route path='/articles/:slug' element={<FullArticle/>}/>
                        <Route path='/articles/:slug/edit' element={<EditArticleForm/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/profile' element={<EditProfile/>}/>
                <Route path='/new-article' element={<ArticleForm/>}/>
                <Route path='*' element={<h1>Page not found!</h1>}/>
            </Routes>
        </Router>
    );
};

export default App;
