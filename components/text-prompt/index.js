import React from 'react';
import Prompt from 'rn-prompt';

const TextPrompt = ({ isVisible, onCancelCallBack, onSubmitCallBack, title, placeHolder, defaultValue }) => {
    return (
        <Prompt
            title= { title }
            placeholder= { placeHolder }
            defaultValue={ defaultValue }
            visible={ isVisible }
            onCancel={ () => onCancelCallBack() } 
            onSubmit={ value => onSubmitCallBack(value) }
        />
    )
};

export default TextPrompt;
