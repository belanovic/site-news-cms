import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import dateFormat from './dateFormat';
import 'react-calendar/dist/Calendar.css';

export default function Calendar({setIsDated, setSelectedDate}) {

    const [value, handleChange] = useState(new Date());

    const [showCalendar, setShowCalendar] = useState(false);
    const [checkValue, setCheckValue] = useState(false);

    const handleCheck = (e)  => {
        setCheckValue(prev => !prev);
    }

    useEffect(() => {setIsDated(checkValue)}, [checkValue] )
    useEffect(() => {setSelectedDate(value)}, [value] )


    return (
        <div
            className="calendar-wrapper"
        >
            <input 
                type = "checkbox"
                checked = {checkValue}
                onChange = {handleCheck}
            ></input>
            <div
                className= {`calendar-container ${checkValue && 'active'}`}
                onClick={() => setShowCalendar(prev => !prev)}
            >
                <div
                    className="calendar-select"
                >
                    <span>{dateFormat(value, 'month', 'dayMonth', 'year')}</span>
                    <i
                        className={`far fa-calendar-alt ${showCalendar && 'show'}`}
                    ></i>
                </div>
                <ReactCalendar
                    onChange={handleChange}
                    value={value}
                    className={showCalendar && 'show'}
                />

            </div>
        </div>
    );
}