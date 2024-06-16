import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Popconfirm } from 'antd';

import { sendFavorite, sendUnfavorite, deleteArticle } from '../../actions';
import MarkdownText from '../MarkdownText';
import Tags from '../Tags';
import './Article.scss';

const Article = ({ article, isFull = false, sendFavorite, isLoggedIn, sendUnfavorite, deleteArticle }) => {

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

    let likeClicked = article.favorited;
    const clickLike = () => {
        if (likeClicked) {
            sendUnfavorite(article.slug);
            likeClicked = false;
            return;
        }
        sendFavorite(article.slug);
        likeClicked = true;
    };

    const title = article.title ?? '';
    const description = (isFull ? article.description ?? '' : trimText(article.description ?? '', 200));
    const body = article.body ?? '';

    const descriptionClass = ['description'];
    descriptionClass.push(isFull ? 'gray' : 'black');

    const message = isFull ? <MarkdownText message={body}/> : null;

    const renderButtons = () => {
        if (isFull && isLoggedIn && localStorage.getItem('username') == article.author.username) {
            return (
                <div className='buttons'>
                    <Popconfirm
                        placement="rightTop"
                        description="Are you sure to delete this article?"
                        onConfirm={() => deleteArticle(article.slug)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='button delete-article-button'>
                            Delete
                        </button>
                    </Popconfirm>
                    <Link
                        className='button edit-article-button'
                        to={`/articles/${article.slug}/edit`}>
                        Edit
                    </Link>
                </div>
            )
        }
        return null;
    };

    return (
        <div className={articleClass.join(' ')}>
            <div className='main-info'>
                <div className='left-part'>
                    <div className='top'>
                        <Link className='title' to={`/articles/${article.slug}`}>{trimText(title, 50)}</Link>
                        <div className='likes'>
                            <input
                                id={`${article.slug}-likes`}
                                type='checkbox'
                                defaultChecked={article.favorited}
                                disabled={!isLoggedIn}
                                onClick={clickLike}/>
                            <label htmlFor={`${article.slug}-likes`}>{article.favoritesCount}</label>
                        </div>
                    </div>
                    <Tags tags={article.tagList}/>
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
            <div className='bottom'>
                <p className={descriptionClass.join(' ')}>{description}</p>
                {renderButtons()}
            </div>
            {message}
        </div>
    );
};

const mapStateToProps = ({ UserReducer }) => ({
    isLoggedIn: UserReducer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    sendFavorite: slug => dispatch(sendFavorite(slug)),
    sendUnfavorite: slug => dispatch(sendUnfavorite(slug)),
    deleteArticle: (slug) => dispatch(deleteArticle(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);