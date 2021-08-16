import react from 'react';
import Facebook from './Facebook';
import './style/social.css';
import Twitter from './Twitter';

export default function Social({tabSocialVisibility, subtitle}) {
    return (
        <div className="article-social" style={{ display: tabSocialVisibility }} >
            <Twitter subtitle = {subtitle} />
            {/* <Facebook /> */}
        </div>
    )
}