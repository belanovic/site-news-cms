import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getByCategory } from './getDatabase';
import './style/search.css';

export default function Search() {

    const [query, setQuery] = useState('');
    
    const { listAllArticles, setListAllArticles,
        listLoaded, setListLoaded } = useContext(context);

    const handleChange = (e) => {
        const v = e.target.value;
        setQuery(v);
    }
    const handleClick = (e) => {
        e.preventDefault();
        const newsFound = listAllArticles.filter((article) => {
            const i = article.title.search(query);
            console.log(i);
            return i === -1? false : true
        })
        setListAllArticles(newsFound)
    }

    return (
        <div className="search">
            <input 
                className = "search-input"
                type = "text"
                value = {query}
                onChange = {handleChange}
                >    
            </input>
            <button
                className = "search-button"
                onClick = {handleClick}
            >Traži
            </button>
        </div>
    )
}