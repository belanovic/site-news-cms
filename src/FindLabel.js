import react, { useState } from 'react';
import './style/FindLabel.css'

export default function FindLabel({ setFindVisible }) {

    const [activeArrow, setActiveArrow] = useState(false);

    const handleClick = () => {
        setActiveArrow(prev => !prev)
        setFindVisible(prev => !prev)
    }

    return (
        <div className="find-label" onClick={() => handleClick()}>
            {/* <div className="find-label-fake">iiiii</div> */}
            <i

                className={`find-label fas fa-chevron-down ${activeArrow && 'up'}`}>
            </i>
            <div className="find-label-text">Pretraga</div>
            <div>
                <i

                    className={`find-label fas fa-chevron-down ${activeArrow && 'up'}`}>
                </i>
            </div>
        </div>
    )
}