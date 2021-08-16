/* var Twit = require('twit')

const T = new Twit({
    consumer_key: 'CwE9zZzMc1jbCWGByKuLWIbi6',
    consumer_secret: 'H1XMToXsQiPb99tpWA3WUjhopPzW1oc9JEOjPTuVKILbSB9FSL',
    access_token: '1424881417541017605-uLDViNeAyb4VoSoQvMGhySRhXwr3C8',
    access_token_secret: 'ulKvAyVIoT6P54KPlnbeTH5r1wwYRH7va7ysbC4UEizsJ'
})

T.post('statuses/update', { status: `${twit}` }, function (err, data, response) {
    console.log(data);
}) */


import react, { useState, useEffect } from 'react';
import {publishTwit} from './getDatabase';


export default function Twitter({ subtitle }) {

    const [twit, setTwit] = useState('');

    const handleChangeTwit = (e) => {
        const value = e.target.value;
        setTwit(value);
    }

    useEffect((prom) => setTwit(subtitle), [subtitle])

    return (
        <div className="twitter">
            <div className="twitter-header">
                <i class="fab fa-twitter"
                        onClick={async () => {
                            const r = await publishTwit(twit);
                            console.log(r);
                        }}
                ></i>
                <span>Twitter</span>
            </div>
            <textarea
                name="twit"
                className="twit"
                value={twit}
                onChange={handleChangeTwit}
            >
            </textarea>
        </div>
    )
}






