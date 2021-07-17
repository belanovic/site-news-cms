import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getByCategory } from './getDatabase';

export default function Search({ setPageNum }) {

    
    const { listAllArticles, setListAllArticles, defaultCathegory, setDefaultCathegory,
        listLoaded, setListLoaded, shouldLoadArticles } = useContext(context);

    const [cathegory, setCathegory] = useState(defaultCathegory);

    const handleSelect = (e) => {
        const option = e.target.value;
        console.log(option);
        setCathegory(option);
        setDefaultCathegory(option);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (cathegory === 'allArticles') {
            const allNews = await getAllArticles();
            console.log(allNews);
            const promiseResolveA = await setListAllArticles(allNews);
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            const allNews = await getByCategory(cathegory);
            console.log(allNews);
            const promiseResolveA = await setListAllArticles(allNews);
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }

    useEffect(async () => {
        if (cathegory === 'allArticles') {
            const allNews = await getAllArticles();
            const promiseResolveA = await setListAllArticles(allNews);
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            const allNews = await getByCategory(cathegory);
            const promiseResolveA = await setListAllArticles(allNews);
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }, [])

    return (
        <div className="search">
            <div className="search-cathegories">
                <label htmlFor="search-cathegories">Rubrike</label>
                <select id="search-cathegories" value={cathegory} onChange={handleSelect}>
                    <option value="allArticles">Sve vesti</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                </select>
            </div>
            <div className="search-button">
                <button
                    className="search-button btn"
                    onClick={handleClick}
                >Traži
                </button>
            </div>
        </div>
    )
}