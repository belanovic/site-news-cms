import react, { useState, useEffect, useContext } from 'react';
import './style/filter.css';
import {context} from './newsContext.js';

export default function Filter({ setImgURL, filterObj, setFilterObj, filterStyle, setFilterStyle }) {

    const {defaultFilter} = useContext(context);

    const handleChange = (e) => {
        const name = e.target.name;
        
        setFilterObj((prev) => {
            prev[0][name] = e.target.value;
            return Array.from(prev)
        })
    }

    const handleReset = () => {
            const newObj = Object.assign({}, defaultFilter[0]);
            setFilterObj([newObj])
    }

    const handleSingleReset = (e) => {
        const name = e.value.name;
    }

    useEffect(() => {
        
        setFilterStyle(() => {
           
            return `blur(${filterObj[0].blur}px) brightness(${filterObj[0].brightness}%) 
                    contrast(${filterObj[0].contrast}%) grayscale(${filterObj[0].grayscale}%) 
                    hue-rotate(${filterObj[0].huRotate}deg) invert(${filterObj[0].invert}%) 
                    opacity(${filterObj[0].opacity}%) saturate(${filterObj[0].saturate}%) 
                    sepia(${filterObj[0].sepia}%)`
        }
        )
    }, [filterObj])

    return (
        <div className="filter">

            <div className="filter-item">
                <label htmlFor="blur">Blur</label>
                <input
                    type="range"
                    name="blur"
                    id="blur"
                    className="blur"
                    min="0"
                    max="30"
                    value={filterObj[0].blur}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].blur} px</span>
            </div>

            <div className="filter-item">
                <label htmlFor="brightness">Brightness</label>
                <input
                    type="range"
                    name="brightness"
                    id="brightness"
                    className="brightness"
                    min="0"
                    max="200"
                    value={filterObj[0].brightness}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].brightness}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="contrast">Contrast</label>
                <input
                    type="range"
                    name="contrast"
                    id="contrast"
                    className="contrast"
                    min="0"
                    max="400"
                    value={filterObj[0].contrast}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].contrast}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="grayscale">Grayscale</label>
                <input
                    type="range"
                    name="grayscale"
                    id="grayscale"
                    className="grayscale"
                    min="0"
                    max="100"
                    value={filterObj[0].grayscale}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].grayscale}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="huRotate">HuRotate</label>
                <input
                    type="range"
                    name="huRotate"
                    id="huRotate"
                    className="huRotate"
                    min="0"
                    max="360"
                    value={filterObj[0].huRotate}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].huRotate} deg</span>
            </div>

            <div className="filter-item">
                <label htmlFor="invert">Invert</label>
                <input
                    type="range"
                    name="invert"
                    id="invert"
                    className="invert"
                    min="0"
                    max="100"
                    value={filterObj[0].invert}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].invert}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="opacity">Opacity</label>
                <input
                    type="range"
                    name="opacity"
                    id="opacity"
                    className="opacity"
                    min="0"
                    max="100"
                    value={filterObj[0].opacity}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].opacity}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="saturate">Saturate</label>
                <input
                    type="range"
                    name="saturate"
                    id="saturate"
                    className="saturate"
                    min="0"
                    max="200"
                    value={filterObj[0].saturate}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].saturate}%</span>
            </div>

            <div className="filter-item">
                <label htmlFor="sepia">Sepia</label>
                <input
                    type="range"
                    name="sepia"
                    id="sepia"
                    className="sepia"
                    min="0"
                    max="100"
                    value={filterObj[0].sepia}
                    onChange={handleChange}
                >
                </input>
                <span className="filter-num">{filterObj[0].sepia}%</span>
            </div>

            <div className="filter-reset">
                <button
                    onClick={() => handleReset()}
                >Reset
                </button>
            </div>
        </div>
    )

}