import Markdown from 'markdown-to-jsx';

import './MarkdownText.scss';

const MarkdownText = ({ message }) => {
    return (
        <div className='message'>
            <Markdown>{message}</Markdown>
        </div>
    );
};

export default MarkdownText;