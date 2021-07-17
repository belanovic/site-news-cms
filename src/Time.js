import React from 'react';
import dateFormat from './dateFormat.js';

export function DateCreated({ timeCreated}) {
    return (
        <div className="allArticles-item-dateCreated allArticles-item-part">
                {dateFormat(timeCreated, 'month', 'dayMonth', 'year', 'comma', 'clock')}
        </div>
    )
}
export function DateUpdated({  timeUpdated }) {
    return (
        <div className="allArticles-item-dateUpdated allArticles-item-part">
                {dateFormat(timeUpdated, 'month', 'dayMonth', 'year', 'comma', 'clock')}
        </div>
    )
}
export function DatePublished({ timePublished, published }) {
    return (
        <div className="allArticles-item-datePublished  allArticles-item-part">
                {published? `${dateFormat(timePublished, 'month', 'dayMonth', 'year', 'comma', 'clock')}` : 'Not published'}
        </div>
    )
}