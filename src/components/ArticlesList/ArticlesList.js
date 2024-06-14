import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Pagination } from 'antd';

import { fetchArticles, changePage } from '../../actions';
import PartialArticle from '../Article';
import ErrorMessage from '../ErrorMessage';
import './ArticlesList.scss';

const ArticlesList = ({ articles, page, totalPages, pageSize, isLoading, isError, fetchArticles, changePage }) => {

    useEffect(() => {
        fetchArticles(page);
    }, [fetchArticles, page]);
    
    const renderArticles = () => {
        return articles.map(article => (
                <li key={article.slug}>
                    <PartialArticle article={article}/>
                </li>
            )
        );
    };

    const hasData = !isLoading && !isError;

    const content = hasData ?
        <ul className='articles-list'>
            {renderArticles()}
        </ul> : null;
    const loading = isLoading ?
        <Spin
            className='spin'
            size='large'/> : null;
    const error = isError ?
        <ErrorMessage/> : null;
    const pagination = hasData && totalPages > 1 ? <Pagination
        className='paginaion'
        size='small'
        pageSize={pageSize}
        pageSizeOptions={[]}
        defaultCurrent={page}
        total={totalPages}
        onChange={changePage}/> : null;

    return (
        <section className='center-section'>
            {content}
            {error}
            {loading}
            {pagination}
        </section>
    );
};

const mapStateToProps = ({ ArticlesReducer }) => ({
    articles: ArticlesReducer.articles,
    page: ArticlesReducer.page,
    totalPages: ArticlesReducer.totalPages,
    pageSize: ArticlesReducer.pageSize,
    isLoading: ArticlesReducer.isLoading,
    isError: ArticlesReducer.isError,
    changePage: ArticlesReducer.changePage,
});

const mapDispatchToProps = dispatch => ({
    fetchArticles: page => dispatch(fetchArticles(page)),
    changePage: page => dispatch(changePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);