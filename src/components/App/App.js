import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import FullArticle from '../FullArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import './App.scss';

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<ArticlesList/>} exact/>
                <Route path='/articles' element={<ArticlesList/>} exact/>
                <Route path='/articles/:slug' element={<FullArticle/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/profile' element={<EditProfile/>}/>
            </Routes>
        </Router>
    );
};

export default App;
