import react, {useState, useEffect} from 'react';

export default function GenericThumb({className, cathegory}) {
    const [caption, setCaption] = useState('');

    const chooseCaption = () => {
        if(cathegory === 'politics') setCaption('Politika');
        if(cathegory === 'business') setCaption('Ekonomija');
        if(cathegory === 'technology') setCaption('Tehnologija');
        if(cathegory === 'entertainment') setCaption('Magazin');
        if(cathegory === 'sports') setCaption('Sport');
    }

    useEffect(prom => chooseCaption(), [cathegory])
    return (
        <div className = "generic-thumb">
            <span>{caption}</span>
        </div>
    )
}