import './Header.scss';

const Header = () => {
    return (
        <header>
            <h1>Realworld Blog</h1>
            <div>
                <button
                    className='sign-in'>
                    Sign In
                </button>
                <button
                    className='sign-up'>
                    Sign Up
                </button>
            </div>
        </header>
    );
};

export default Header;
