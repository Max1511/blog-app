import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spin } from 'antd';

import { signUp } from '../../actions';

import './SignUp.scss';

const SignUp = ({ isLoading, isError, errorMessage, signUp }) => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required('Password is required')
            .min(3, 'Username should be at least 3 characters')
            .max(20, 'Username cannot exceed more than 20 characters'),
        email: Yup.string()
            .required('Email address is required')
            .matches(EMAIL_REGEXP, 'This Email address is not correct'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Your password needs to be at least 6 characters')
            .max(40, 'Your password cannot exceed more than 40 characters'),
        repeatedPassword: Yup.string()
            .required('Repeat Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        agree: Yup.boolean()
            .oneOf([true], '')
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
    let repeatedPasswordInputClasses = ['text-input'];
    if (errors.repeatedPassword) repeatedPasswordInputClasses.push('error-input');
    let agreeInputClasses = ['agree-label'];
    if (errors.agree) agreeInputClasses.push('error-input');

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit((data) => signUp(data))}>
                <h1>Create new account</h1>
                <label className='label'>Username</label>
                <input
                    className={usernameInputClasses.join(' ')}
                    {...register('username')}
                    placeholder='Username'/>
                {errors.username && <p className='error'>{errors.username.message}</p>}
                <label className='label'>Email address</label>
                <input
                    className={emailInputClasses.join(' ')}
                    {...register('email')}
                    placeholder='Email address'/>
                {errors.email && <p className='error'>{errors.email.message}</p>}
                <label className='label'>Password</label>
                <input
                    className={passwordInputClasses.join(' ')}
                    type='password'
                    {...register('password')}
                    placeholder='Password'/>
                {errors.password && <p className='error'>{errors.password.message}</p>}
                <label className='label'>Repeat Password</label>
                <input
                    className={repeatedPasswordInputClasses.join(' ')}
                    type='password'
                    {...register('repeatedPassword')}
                    placeholder='Password'/>
                {errors.repeatedPassword && <p className='error'>{errors.repeatedPassword.message}</p>}
                <div className='bottom-part'>
                    <input
                        className='agree'
                        id='agree'
                        type='checkbox'
                        {...register('agree')}/>
                    <label
                        className={agreeInputClasses.join(' ')}
                        htmlFor='agree'>
                        I agree to the processing of my personal information
                    </label>
                </div>
                <button
                    className='submit'
                    type='submit'>
                    Create
                </button>
                {isError ? <span className='error'>{ errorMessage }</span> : null}
                <p className='last-question'>Already have an account? <Link className='link' to='/sign-in'>Sign In</Link>.</p>
            </form>
        );
    };

    const content = !isLoading ?
        renderForm() : null;
    const loading = isLoading ?
        <Spin
            className='spin'
            size='large'/> : null;

    return (
        <>
            {content}
            {loading}
        </>
    );
};

const mapStateToProps = ({ UserReducer }) => ({
    isLoading: UserReducer.isLoading,
    isError: UserReducer.isError,
    errorMessage: UserReducer.errorMessage
});

const mapDispatchToProps = dispatch => ({
    signUp: data => dispatch(signUp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);