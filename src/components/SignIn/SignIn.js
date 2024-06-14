import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spin } from 'antd';

import { signIn } from '../../actions';

import './SignIn.scss';

const SignIn = ({ isLoading, isError, errorMessage, signIn }) => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email address is required')
            .matches(EMAIL_REGEXP, 'This Email address is not correct'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Your password needs to be at least 6 characters')
            .max(40, 'Your password cannot exceed more than 40 characters')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    let emailInputClasses = ['text-input'];
    if (errors.email) emailInputClasses.push('error-input');
    let passwordInputClasses = ['text-input'];
    if (errors.password) passwordInputClasses.push('error-input');

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit((data) => signIn(data))}>
                <h1>Sign In</h1>
                <label className='label'>Email address</label>
                <input
                    className={emailInputClasses.join(' ')}
                    {...register('email', { required: true, pattern: EMAIL_REGEXP})}
                    placeholder='Email address'/>
                {errors.email && <p className='error'>Wrong email</p>}
                <label className='label'>Password</label>
                <input
                    className={passwordInputClasses.join(' ')}
                    type='password'
                    {...register('password', { required: true, minLength: 6 })}
                    placeholder='Password'/>
                {errors.password && <p className='error'>Wrong password</p>}
                <button
                    className='submit'
                    type='submit'>
                    Login
                </button>
                {isError ? <span className='error'>{ errorMessage }</span> : null}
                <p className='last-question'>Don't have an account? <Link className='link' to='/sign-up'>Sign Up</Link>.</p>
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
    signIn: data => dispatch(signIn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);