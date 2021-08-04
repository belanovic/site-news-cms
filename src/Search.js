import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles } from './getDatabase';
import './style/search.css';

export default function Search() {

    const [query, setQuery] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    
    const { listAllArticles, setListAllArticles,
        listLoaded, setListLoaded } = useContext(context);

    const handleChange = (e) => {
        const v = e.target.value;
        setQuery(v);
    }
    const find = async () => {
        setRequestSent(true);
        const all = await getAllArticles();
        const newsFound = all.filter((article) => {
            const reg = new RegExp(`${query}`, 'i');
            const i = article.title.search(reg);
            console.log(i);
            return i === -1? false : true
        })
        setRequestSent(false);
        return newsFound
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const newsFound = await find();
        setListAllArticles(newsFound);
    }

    const handleKeyDown = async (e) => {
    
        if(e.keyCode === 13) {
            const newsFound = await find();
            setListAllArticles(newsFound);
        }
    }

    /* useEffect(() => setRequestSent(false)); */

    return (
        <div className="search">
            <input 
                className = "search-input"
                type = "text"
                value = {query}
                onChange = {handleChange}
                onKeyDown = {handleKeyDown}
                >    
            </input>
            <i class="fas fa-search"></i>
            <button
                className = {`search-button ${requestSent && 'sending'}`}
                onClick = {handleClick}
            >{requestSent? 'Traženje...' : 'Traži'}
            </button>
        </div>
    )
}