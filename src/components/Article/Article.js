import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import MarkdownText from '../MarkdownText';
import Tags from '../Tags';
import './Article.scss';

const Article = ({ article, isFull = false }) => {

    const articleClass = ['article'];
    articleClass.push(isFull ? 'full' : 'short');

    const trimText = (text, trimPosition) => {
        if (text.length > trimPosition) {
            for (let i = trimPosition; i < text.length; i++) {
                return text.slice(0, i) + '...';
            }
        }
        return text;
    };

    const description = isFull ? article.description : trimText(article.description, 200);

    const descriptionClass = ['description'];
    descriptionClass.push(isFull ? 'gray' : 'black');

    const message = isFull ? <MarkdownText message={article.body}/> : null;

    return (
        <div className={articleClass.join(' ')}>
            <div className='main-info'>
                <div className='left-part'>
                    <div className='top'>
                        <Link className='title' to={`/articles/${article.slug}`}>{trimText(article.title, 50)}</Link>
                        <div className='likes'>
                            <input
                                id={`${article.slug}-likes`}
                                type='checkbox'/>
                            <label htmlFor={`${article.slug}-likes`}>{article.favoritesCount}</label>
                        </div>
                    </div>
                    <Tags tags={article.tagList}/>
                    <p className={descriptionClass.join(' ')}>{trimText(description, 200)}</p>
                </div>
                <div className='right-part'>
                    <div>
                        <h2 className='author-name'>{article.author.username}</h2>
                        <span className='created-data'>{format(Date(article.createdAt), 'MMMM dd, yyyy')}</span>
                    </div>
                    <img
                        className='avatar'
                        src={article.author.image}
                        alt={article.author.username}/>
                </div>
            </div>
            {message}
        </div>
    );
};

export default Article;