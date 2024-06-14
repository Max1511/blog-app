import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spin } from 'antd';

import { updateUser } from '../../actions';

import './EditProfile.scss';

const EditProfile = ({ isLoggedIn, isLoading, isError, errorMessage, updateUser }) => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const URL_REGEXP = /((https)?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/i;

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username should be at least 3 characters')
            .max(20, 'Username cannot exceed more than 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .matches(EMAIL_REGEXP, 'This Email address is not correct'),
        password: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === '' ? null : curr))
            .min(6, 'Your password needs to be at least 6 characters')
            .max(40, 'Your password cannot exceed more than 40 characters'),
        image: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === '' ? null : curr))
            .matches(URL_REGEXP, 'This image URL is not correct')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    let usernameInputClasses = ['text-input'];
    if (errors.username) usernameInputClasses.push('error-input');
    let emailInputClasses = ['text-input'];
    if (errors.email) emailInputClasses.push('error-input');
    let passwordInputClasses = ['text-input'];
    if (errors.password) passwordInputClasses.push('error-input');
    let imageInputClasses = ['text-input'];
    if (errors.image) imageInputClasses.push('error-input');

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit((data) => updateUser(data))}>
                <h1>Edit Profile</h1>
                <label className='label'>Username</label>
                <input
                    className={usernameInputClasses.join(' ')}
                    {...register('username')}
                    defaultValue={localStorage.getItem('username')}
                    placeholder='Username'/>
                {errors.username && <p className='error'>{errors.username.message}</p>}
                <label className='label'>Email address</label>
                <input
                    className={emailInputClasses.join(' ')}
                    {...register('email')}
                    defaultValue={localStorage.getItem('email')}
                    placeholder='Email address'/>
                {errors.email && <p className='error'>{errors.email.message}</p>}
                <label className='label'>New password</label>
                <input
                    className={passwordInputClasses.join(' ')}
                    type='password'
                    {...register('password')}
                    placeholder='New password'/>
                {errors.password && <p className='error'>{errors.password.message}</p>}
                <label className='label'>Avatar image (url)</label>
                <input
                    className={imageInputClasses.join(' ')}
                    {...register('image')}
                    placeholder='Avatar image'/>
                {errors.image && <p className='error'>{errors.image.message}</p>}
                <button
                    className='submit'
                    type='submit'>
                    Save
                </button>
                {isError ? <span className='error'>{ errorMessage }</span> : null}
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

const mapStateToProps = ({ UserReducer }) => ({
    isLoggedIn: UserReducer.isLoggedIn,
    isLoading: UserReducer.isLoading,
    isError: UserReducer.isError,
    errorMessage: UserReducer.errorMessage
});

const mapDispatchToProps = dispatch => ({
    updateUser: data => dispatch(updateUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);