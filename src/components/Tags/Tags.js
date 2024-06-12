import { useRef } from 'react';
import './Tags.scss';

const Tags = ({ tags }) => {

    const maxIdRef = useRef(0);

    const renderTags = () => {
        return tags.map(tag => (
            <li
                key={maxIdRef.current++}
                className='tag'>
                <span>{tag}</span>
            </li>
        ));
    };

    return (
        <ul className='tags'>
            {renderTags()}
        </ul>
    );
};

export default Tags;