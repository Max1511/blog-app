import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spin } from 'antd';

import { postArticle, addTag, updateTag, deleteTag } from '../../actions';

import './ArticleForm.scss';

const ArticleForm = ({ isLoggedIn, tags, isLoading, isError, postArticle, addTag, updateTag, deleteTag }) => {
    
    const formSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        text: Yup.string()
            .required('Text is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    let titleInputClasses = ['text-input'];
    if (errors.title) titleInputClasses.push('error-input');
    let descriptionInputClasses = ['text-input'];
    if (errors.description) descriptionInputClasses.push('error-input');
    let textInputClasses = ['text-input'];
    if (errors.text) textInputClasses.push('error-input');

    const renderTags = () => {
        const tagInputs = tags.map((tag, index) => {
            return (
                <li className='tag-form' key={index}>
                    <input
                        className='text-input tag-input'
                        {...register(`tags[${index}]`)}
                        onChange={(event) => updateTag(index, event.target.defaultValue)}
                        placeholder='Tag'/>
                    <button
                        className='button delete-tag-button'
                        onClick={() => deleteTag(index)}>
                        Delete
                    </button>
                </li>
            )
        });

        return (
            <>
                <label className='label'>Tags</label>
                <div className='tags-block'>
                    <ul className='tags'>
                        {tagInputs}
                    </ul>
                    <button
                        className='button add-tag-button'
                        onClick={() => addTag()}>
                        Add tag
                    </button>
                </div>
            </>
        );
    };

    const renderForm = () => {
        return (
            <form className='article-form' onSubmit={handleSubmit((data) => postArticle(data))}>
                <h1>{'Create new article'}</h1>
                <label className='label'>Title</label>
                <input
                    className={titleInputClasses.join(' ')}
                    {...register('title')}
                    placeholder='Title'/>
                {errors.title && <p className='error'>{errors.title.message}</p>}
                <label className='label'>Short description</label>
                <input
                    className={descriptionInputClasses.join(' ')}
                    type='description'
                    {...register('description')}
                    placeholder='Title'/>
                {errors.description && <p className='error'>{errors.description.message}</p>}
                <label className='label'>Text</label>
                <textarea
                    className={textInputClasses.join(' ')}
                    {...register('text')}
                    placeholder='Text'/>
                {errors.text && <p className='error'>{errors.text.message}</p>}
                {renderTags()}
                <input
                    className='submit'
                    type='submit'
                    value='Send'/>
                {isError ? <span className='error'>Unexpected error</span> : null}
            </form>
        );
    };

    const content = !isLoading ?
        renderForm() : null;
    const loading = isLoading ?
        <Spin
            className='spin'
            size='large'/> : null;
    
    if (!isLoggedIn) {
        return <Navigate to='/sign-in'/>
    }

    return (
        <>
            {content}
            {loading}
        </>
    );
};

const mapStateToProps = ({ UserReducer, ArticleFormReducer }) => ({
    isLoggedIn: UserReducer.isLoggedIn,
    tags: ArticleFormReducer.tags,
    isLoading: ArticleFormReducer.isLoading,
    isError: ArticleFormReducer.isError
});

const mapDispatchToProps = dispatch => ({
    postArticle: data => dispatch(postArticle(data)),
    addTag: (text = '') => dispatch(addTag(text)),
    updateTag: (index, text) => dispatch(updateTag(index, text)),
    deleteTag: (index) => dispatch(deleteTag(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);