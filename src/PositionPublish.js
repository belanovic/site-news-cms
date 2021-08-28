import React from 'react';
import './style/position-publish.css';

export default function PositionPublish({ frontpageNews, setPosition, 
    published, setPublished, position, currentPosition, setIdArticleToChangePosition}) {
    let showPosition = published === true ? 'inline' : 'none';
    const handleNumber = (e) => {
        if (published === false) {
            setPosition(0);
            return
        }
        const numInput = parseInt(e.target.value);
        if (numInput > 10 || numInput < 0) return;
        setPosition(numInput);
        const articleWithSamePosition = frontpageNews.find((prom) => {
            return prom.position === numInput
        })
        if (articleWithSamePosition === undefined) return;
        setIdArticleToChangePosition(articleWithSamePosition._id);
        console.log(articleWithSamePosition._id, currentPosition);
    }

    const handleCheck = (e) => {
        const v = e.target.checked;
        setPublished(v);
        if (v === false) {
            setPosition(0)
        }
    }

    return (
        <div className="position-publish">
            <div className = "publish">
                <label 
                    htmlFor="publish-checkbox"
                    className="publish-label"
                >Objavljeno
                </label>
                <input
                    id="publish-checkbox"
                    name="publish-checkbox"
                    type="checkbox"
                    className="publish-checkbox"
                    checked={published}
                    onChange={handleCheck}
                ></input>
            </div>
            <div className = "position">
            <input
                type="number"
                min="0"
                max="10"
                className="position-input"
                onChange={handleNumber}
                value={position}
                style={{ display: showPosition }}
            ></input>
            </div>

        </div>
    )
}