import React, { useContext, useEffect } from 'react';
import PaginationButton from './Pagination-button';
import { context } from './newsContext';

export default function Pagination({ pageNum, setPageNum, isLastPage, NEWS_PER_PAGE }) {
    const { listAllArticles } = useContext(context);
    const numOfPages = Math.ceil(listAllArticles.length / NEWS_PER_PAGE)

    const increasePageNum = () => {
        setPageNum((prev) => {
            return prev + 1
        })
    }
    const decreasePageNum = () => {
        setPageNum((prev) => {
            if (prev === 1) return prev;
            return prev - 1
        })
    }

    const firstPageNum = () => {
        setPageNum(1)
    }
    const lastPageNum = () => {
        setPageNum(numOfPages);
    }

    const generateNumButtons = () => {
        let list = [];
        for (let i = 1; i <=numOfPages; i++) {
            list.push(<PaginationButton key={i} sign={i} setPageNum={setPageNum} currentBtn={pageNum === i} />)
        }
        let shortList = list.slice(pageNum - 1 - 1, pageNum  + 1);
        if (pageNum === 1) shortList.unshift(list[0])
        return shortList;
    }

    return (
        <div className="pagination">
            {pageNum !== 1 && 
                <PaginationButton 
                    sign= {<i className="fas fa-fast-backward"></i>}
                    clickHandler = {firstPageNum} 
            />}
            { pageNum !== 1 &&
                <PaginationButton
                    sign= {<i className="fas fa-chevron-left"></i>}
                    pageNum={pageNum}
                    clickHandler={decreasePageNum}
                />}
            {generateNumButtons()}
            {!isLastPage &&
                <PaginationButton
                    sign= {<i className="fas fa-chevron-right"></i>}
                    pageNum={pageNum}
                    clickHandler={increasePageNum}
                />}
            {pageNum !== numOfPages && 
                <PaginationButton 
                    sign = {<i className="fas fa-fast-forward"></i>}
                    clickHandler = {lastPageNum}
            />}
        </div>
    )
}