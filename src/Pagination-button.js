import React from 'react';
import './style/pagination.css';

export default function PaginationButton({sign, clickHandler, pageNum, setPageNum, currentBtn}){
    return (
        typeof sign !== 'number'? <button onClick = {clickHandler}>{sign}</button> 
        : 
        <button className = {currentBtn? 'currentBtn' : ''} onClick = {() => setPageNum(sign)}>{sign}</button>
    )
}