import React, {useRef, useState} from 'react';

export default function TextDiv({paragraphs, setParagraphs}) {
    const [text, setText] = useState('');
    const divText = useRef(null);

    function findNewLine() {
        const pasusi = text.split('\n')
        const elementsP = pasusi.map((prom, i) =><p key = {i}>{prom}</p>);
        setParagraphs(elementsP);
    }

    const handleInput = (e) => {
        const textContent = e.target.textContent;
        setText(textContent);
    }
    
    return (
        <div
            ref = {divText}
            contentEditable = {true}
            className = "textdiv"
            onInput = {handleInput}
        >{text}
        </div>
    )
}