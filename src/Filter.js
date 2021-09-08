import react, {useState, useEffect} from 'react';
import './style/filter.css';

export default function Filter({setImgURL, setFilter}) {

    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [huRotate, setHueRotate] = useState(0);
    const [invert, setInvert] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const [saturate, setSaturate] = useState(100);
    const [sepia, setSepia] = useState(0);

    const handleChange = (e) => {
        const name = e.target.name;
        if(name === 'blur') {setBlur(e.target.value); return};
        if(name === 'brightness') {setBrightness(e.target.value); return};
        if(name === 'contrast') {setContrast(e.target.value); return};
        if(name === 'grayscale') {setGrayscale(e.target.value); return};
        if(name === 'huRotate') {setHueRotate(e.target.value); return};
        if(name === 'invert') {setInvert(e.target.value); return};
        if(name === 'opacity') {setOpacity(e.target.value); return};
        if(name === 'saturate') {setSaturate(e.target.value); return};
        if(name === 'sepia') {setSepia(e.target.value); return};
        
    }

    const handleReset = () => {
        setBlur(0);
        setBrightness(100);
        setContrast(100);
        setGrayscale(0);
        setHueRotate(0);
        setInvert(0);
        setOpacity(100);
        setSaturate(100);
        setSepia(0);
    }
    
    useEffect(() => {

        setFilter((prev) => {
            return {
                URL: prev.URL,
                filter: `blur(${blur}px) brightness(${brightness}%) 
                        contrast(${contrast}%) grayscale(${grayscale}%) 
                        hue-rotate(${huRotate}deg) invert(${invert}%) 
                        opacity(${opacity}%) saturate(${saturate}%) 
                        sepia(${sepia}%)`
            }
        })
    }, [blur, brightness, contrast, grayscale, huRotate, invert, opacity, saturate, sepia])

    return (
        <div className = "filter">

            <div className = "filter-item">
                <label htmlFor = "blur">Blur</label>
                <input 
                    type = "range"
                    name = "blur"
                    id = "blur" 
                    className = "blur"
                    min="0" 
                    max="30" 
                    value= {blur}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{blur} px</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "brightness">Brightness</label>
                <input 
                    type = "range" 
                    name = "brightness"
                    id = "brightness" 
                    className = "brightness"
                    min="0" 
                    max="200" 
                    value= {brightness}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{brightness}%</span>
                </div>

            <div className = "filter-item">
                <label htmlFor = "contrast">Contrast</label>
                <input 
                    type = "range" 
                    name = "contrast"
                    id = "contrast" 
                    className = "contrast"
                    min="0" 
                    max="400" 
                    value= {contrast}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{contrast}%</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "grayscale">Grayscale</label>
                <input 
                    type = "range" 
                    name = "grayscale"
                    id = "grayscale" 
                    className = "grayscale"
                    min="0" 
                    max="100" 
                    value= {grayscale}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{grayscale}%</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "huRotate">HuRotate</label>
                <input 
                    type = "range" 
                    name = "huRotate"
                    id = "huRotate" 
                    className = "huRotate"
                    min="0" 
                    max="360" 
                    value= {huRotate}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{huRotate} deg</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "invert">Invert</label>
                <input 
                    type = "range" 
                    name = "invert"
                    id = "invert" 
                    className = "invert"
                    min="0" 
                    max="100" 
                    value= {invert}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{invert}%</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "opacity">Opacity</label>
                <input 
                    type = "range" 
                    name = "opacity"
                    id = "opacity" 
                    className = "opacity"
                    min="0" 
                    max="100" 
                    value= {opacity}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{opacity}%</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "saturate">Saturate</label>
                <input 
                    type = "range" 
                    name = "saturate"
                    id = "saturate" 
                    className = "saturate"
                    min="0" 
                    max="200" 
                    value= {saturate}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{saturate}%</span>
            </div>

            <div className = "filter-item">
                <label htmlFor = "sepia">Sepia</label>
                <input 
                    type = "range" 
                    name = "sepia"
                    id = "sepia" 
                    className = "sepia"
                    min="0" 
                    max="100" 
                    value= {sepia}
                    onChange = {handleChange}
                >
                </input>
                <span className = "filter-num">{sepia}%</span>
            </div>
            <div className = "filter-reset">
                <button 
                    onClick = {() => handleReset()}
                >Reset
                </button>
            </div>
        </div>
    )

}