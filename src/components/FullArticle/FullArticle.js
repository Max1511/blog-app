import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { fetchArticle } from '../../actions';
import Article from '../Article';
import ErrorMessage from '../ErrorMessage';
import './FullArticle.scss';

const FullArticle = ({ article, isLoading, isError, fetchArticle }) => {

    const { slug } = useParams();

    useEffect(() => {
        fetchArticle(slug);
    }, [fetchArticle, slug]);

    const hasData = !isLoading && !isError;

    const content = hasData ?
        <Article
            article={article}
            isFull={true}/> : null;
    const loading = isLoading ?
        <Spin
            className='spin'
            size='large'/> : null;
    const error = isError ?
        <ErrorMessage/> : null;

    return (
        <section className='center-section'>
            {content}
            {error}
            {loading}
        </section>
    );
}

const mapStateToProps = ({ ArticleReducer }) => ({
    article: ArticleReducer.article,
    isLoading: ArticleReducer.isLoading,
    isError: ArticleReducer.isError,
});

const mapDispatchToProps = dispatch => ({
    fetchArticle: (slug) => dispatch(fetchArticle(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);