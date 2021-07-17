import react, {useContext, useEffect, useState} from 'react';

export default function Tags({tagsArr, setTagsArr}) {
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            setTagsArr((prev) => {
                console.log(prev)
                const arr = Array.from(prev);
                const newArrElem = inputValue;
                arr.push(newArrElem);
                return arr
            });
        }
    }

    const handleClose = (i) => {
        setTagsArr((prev) => {
            const arr = Array.from(prev);
            arr.splice(i, 1);
            return arr
        });
    }

    return (
        <div className = "tags">
            <label htmlFor = "tags-input">Unesi tag</label>
            <input 
                type = "text" 
                className = "tags-input"
                id = "tags-input" 
                onChange = {handleChange}
                onKeyDown = {handleKeyDown}
                value = {inputValue}
            ></input><button>Zapamti tag</button>

            <div className = "tags-row">
                {tagsArr && tagsArr.map((prom, i) => {
                    return <div 
                                className = "tag" 
                                key = {i}
                            >
                                {prom}
                                {i !== 0 && <i className="fas fa-times" onClick = {() => handleClose(i)}></i>}
                            </div>
                    }
                )}
            </div>
        </div>
    )
}