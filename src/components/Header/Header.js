import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../actions';

import './Header.scss';

const Header = ({ isLoggedIn, logOut }) => {

    const renderButtons = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <Link
                        className='button sign-in'
                        to='/sign-in'>
                        Sign In
                    </Link>
                    <Link
                        className='button sign-up'
                        to='/sign-up'>
                        Sign Up
                    </Link>
                </>
            );
        }
        return (
            <>
                <Link
                    className='button create-article'
                    to='/'>
                    Create article
                </Link>
                <Link
                    className='profile'
                    to='/profile'>
                    <span className='username'>{localStorage.getItem('username')}</span>
                    <img className='avatar' src={localStorage.getItem('image')} alt=''/>
                </Link>
                <Link
                    className='button log-out'
                    to='/'
                    onClick={logOut}>
                    <span>Log Out</span>
                </Link>
            </>
        );
    };

    return (
        <header>
            <Link
                className='blog-link'
                to='/'>
                Realworld Blog
            </Link>
            <div className='buttons'>
                {renderButtons()}
            </div>
        </header>
    );
};

const mapStateToProps = ({ UserReducer }) => ({
    isLoggedIn: UserReducer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    logOut: data => dispatch(logOut(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
