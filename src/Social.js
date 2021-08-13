import react from 'react';
import Facebook from './Facebook';
import './style/social.css';

export default function Social({tabSocialVisibility}) {
    return (
        <div className="article-social" style={{ display: tabSocialVisibility }} >
            <Facebook />
        </div>
    )
}