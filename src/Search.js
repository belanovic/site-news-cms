import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles } from './getDatabase';
import './style/search.css';

export default function Search({option}) {

    const [query, setQuery] = useState('');
    const [requestSent, setRequestSent] = useState(false);

    const caption = option === 'title'? "Pretraži naslove" : "Pretraži tagove";
    
    const { listAllArticles, setListAllArticles,
        listLoaded, setListLoaded } = useContext(context);

    const handleChange = (e) => {
        const v = e.target.value;
        setQuery(v);
    }
    const findTitle = async () => {
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
    const findTag = async () => {
        setRequestSent(true);
        const all = await getAllArticles();
        const newsFound = all.filter((article) => {
            const reg = new RegExp(`${query}`, 'i'); 
            const some = article.tagsArr.some(tag => {
                const i = tag.search(reg);
                console.log(i)
                return i === -1? false : true
            });
            console.log(some);
            return some
        })
        console.log(newsFound);
        setRequestSent(false);
        return newsFound
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if(query.trim() === '') {
            setQuery('');
            return '';
        }
        let newsFound;
        if(option === 'title') {
            newsFound = await findTitle();
        } else if(option === 'tag') {
            newsFound = await findTag();
        }
        setListAllArticles(newsFound);
    }

    const handleKeyDown = async (e) => {
    
        if(e.keyCode === 13) {
            let newsFound;
            if(option === 'title') {
                newsFound = await findTitle();
            } else if(option === 'tag') {
                newsFound = await findTag()
            }
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
                placeholder = {`${caption}`}
                >    
            </input>
            {/* <i class="fas fa-search"></i> */}
            
            <button
                className = {`search-button ${requestSent && 'sending'}`}
                onClick = {handleClick}
            >{requestSent? 'Pretraživanje...' : 'Traži'}
            </button>
            <i
                onClick = {handleClick}
                className = {`fas fa-search ${requestSent && 'sending'}`}
            ></i>
        </div>
    )
}