import react, {useState, useEffect} from 'react';

export default function GenericThumb({className, cathegory, shape}) {

    const [thumbURL, setThumbURL] = useState('');

    const chooseThumb = () => {
        if(shape === 'wide') {
            if(cathegory === 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fpolitika_wide.jpg?alt=media&token=bc2ebef2-cce1-4dbd-b2ec-4d43ddbe5a00');
            if(cathegory === 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fekonomija_wide.jpg?alt=media&token=7ca52254-b464-4319-b7c2-393ba45a06ba');
            if(cathegory === 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftehnologija_wide.jpg?alt=media&token=53ead51f-8853-4b6b-826e-1d0b93e0504c');
            if(cathegory === 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fmagazin_wide.jpg?alt=media&token=a00cfa44-0c8b-4a6a-abd0-217156cb7297');
            if(cathegory === 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fsport_wide.jpg?alt=media&token=bcd1b8f3-ba0b-4a2c-969c-92e270223e45');
        }
        if(shape === 'square') {
            if(cathegory === 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fpolitika_square.jpg?alt=media&token=8f8ffa20-947d-47d4-b91d-554a0554ff72');
            if(cathegory === 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fekonomija_square.jpg?alt=media&token=466add3d-f4c1-445b-84d7-11c64cebfe11');
            if(cathegory === 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftehnologija_square.jpg?alt=media&token=b4c682e3-1744-482b-85b5-f67c5880efbc');
            if(cathegory === 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fmagazin_square.jpg?alt=media&token=58d141cb-eda6-4781-afeb-e5f7b91b01a9');
            if(cathegory === 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fsport_square.jpg?alt=media&token=6307a1ec-3662-4ca2-8036-31a55dab2d2f');
        }

    }
    useEffect(prom => chooseThumb(), [cathegory]);
    return (
            <img 
                className = {className}
                src = {thumbURL}
            >
            </img>

    )
}