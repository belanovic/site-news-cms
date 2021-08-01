import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getByCategory } from './getDatabase';
import './style/cathegory.css';

export default function Cathegory({ setPageNum, sortArticles }) {

    
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
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            const allNews = await getByCategory(cathegory);
            console.log(allNews);
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }

    useEffect(async () => {
        if (cathegory === 'allArticles') {
            const allNews = await getAllArticles();
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1)
        } else {
            const allNews = await getByCategory(cathegory);
            const promiseResolveA = await setListAllArticles(allNews);
            sortArticles();
            const promiseResolveB = await setListLoaded(true);
            setPageNum(1);
        }
    }, [])

    return (
        <div className="cathegory">
            <div className="cathegory-cathegories">
                <label htmlFor="cathegory-cathegories">Rubrike</label>
                <select id="cathegory-cathegories" value={cathegory} onChange={handleSelect}>
                    <option value="allArticles">Sve vesti</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                </select>
            </div>
            <div className="cathegory-button">
                <button
                    className="cathegory-button btn"
                    onClick={handleClick}
                >Prikaži
                </button>
            </div>
        </div>
    )
}