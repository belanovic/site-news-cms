import React, {useState, useEffect} from 'react';

export default function CallTimer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {setSeconds(prev => prev + 1)}, 1000);

        return () => {
            setSeconds(0);
            clearInterval(interval);
        }
    }, [])
    return (
        <div className = "duration-numbers">{seconds}</div>
    )
}

    