import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import FullArticle from '../FullArticle';
import './App.scss';

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<ArticlesList/>} exact/>
                <Route path='/articles' element={<ArticlesList/>} exact/>
                <Route path='/articles/:slug' element={<FullArticle/>}/>
            </Routes>
        </Router>
    );
};

export default App;
