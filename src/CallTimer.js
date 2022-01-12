import React, {useState, useEffect} from 'react';

export default function CallTimer() {
    const [seconds, setSeconds] = useState(0);

    const handleSeconds = (allSeconds) => {
        const remainingSeconds = allSeconds%60;

        return remainingSeconds < 10? '0' + remainingSeconds : remainingSeconds
    }
    const handleMinutes = (allSeconds) => {
        const minutes = Math.floor(seconds/60);
        return minutes < 10? '0' + minutes : minutes
    }

    useEffect(() => {
        const interval = setInterval(() => {setSeconds(prev => prev + 1)}, 1000);

        return () => {
            setSeconds(0);
            clearInterval(interval);
        }
    }, [])
    return (
        <div className = "duration-numbers">{handleMinutes(seconds)} : {handleSeconds(seconds)}</div>
    )
}

    