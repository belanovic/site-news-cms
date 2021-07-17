import react, { useState, useEffect, useContext } from 'react';
import { getFrontpageNews, updateFrontpage, getByDate } from './getDatabase';
import { context } from './newsContext.js';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SearchDate from './SearchDate';
import { useToggle } from './customHooks.js'

export default function Order() {

    const [frontpageNews, setFrontpageNews] = useState('');
    const [reorderedArticles, setreorderedArticles] = useState('');
    const [activeArrow, setActiveArrow] = useState('');
    const [doubleSelectedArticle, setDoubleSelectedArticle] = useState('');
    const [newsByDateAllComp, setNewsByDateAllComp] = useState([]);
    const { setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend } = useContext(context);

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (activeArrow !== '' && activeArrow === source.index) {
            setActiveArrow(destination.index);
        } else {
            setActiveArrow('')
        }
        setDoubleSelectedArticle('');

        const articles = Object.assign([], reorderedArticles);
        const droppedArticle = articles[source.index];

        articles.splice(source.index, 1);
        articles.splice(destination.index, 0, droppedArticle);
        setreorderedArticles(articles)
    }

    const handleClickOrder = async () => {
        const idAndPositionArr = reorderedArticles.map((prom, i) => {
            const idAndPosition = {
                id: prom._id,
                position: i + 1
            }
            return idAndPosition

        })
        const updatedFrontpage = await updateFrontpage(idAndPositionArr);
     
        /* updatedFrontpage.sort((a, b) => a.position - b.position).forEach((prom) => {
            if (prom.position > 0) console.log(prom.title)
        }) */
    }

    const handleClickArrow = (e, i) => {
        setDoubleSelectedArticle('');
        if (i === activeArrow) {
            setActiveArrow('');
            return
        }
        setActiveArrow(i);
    }

    useEffect(() => {
        setShowHomepageBtn('inline-block');
        setAllArticlesBtn('inline-block');
        setNewArticleBtn('inline-block');
        setShowFrontend('none');
    })

    useEffect(async () => {
        const n = await getFrontpageNews();
        setFrontpageNews(n);
        setreorderedArticles(n);

        const d = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }

        const result = await getByDate(d);
        setNewsByDateAllComp(result);
    }, [])

    return (

        <div className="order">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="order-articles-dpl">
                    {(provided) => {
                        return <div ref={provided.innerRef} {...provided.droppableProps} className="order-articles">
                            {reorderedArticles && reorderedArticles.map(
                                (article, i) => {
                                    return (
                                    
                                    <Draggable key={i} index={i} draggableId={`order-articles-item-drg${i}`}>
                                        {(provided) => {
                                            return <><div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={i}
                                                className="order-articles-item"

                                            >   <div
                                                className={`order-articles-item-elements ${activeArrow === i ? 'arrowUp' : 'arrowDown'} 
                                                ${doubleSelectedArticle === i ? 'double' : ''}`}
                                            >
                                                    <div
                                                        className="order-articles-item-number"
                                                    >{i + 1}.</div>
                                                    <div
                                                        className="order-articles-item-title"
                                                    >{article.title}</div>
                                                    <div
                                                        className={`order-articles-item-edit ${activeArrow === i ? 'up' : 'down'}`}
                                                        onClick={(e) => handleClickArrow(e, i)}
                                                    >
                                                        <i
                                                            className="fas fa-chevron-down"
                                                        ></i>
                                                    </div>
                                                </div>
                                                <SearchDate
                                                    reorderedArticles={reorderedArticles}
                                                    setreorderedArticles={setreorderedArticles}
                                                    i={i}
                                                    activeArrow={activeArrow}
                                                    setActiveArrow={setActiveArrow}
                                                    setDoubleSelectedArticle={setDoubleSelectedArticle}
                                                    newsByDateAllComp={newsByDateAllComp}

                                                />
                                            </div>
                                                {i === 4 && <div className="order-articles-item-space"></div>}
                                                {i === 8 && <div className="order-articles-item-space"></div>}
                                            </>
                                        }}
                                    </Draggable>                                    
                                    )
                                }
                            )}
                            {provided.placeholder}
                        </div>
                    }
                    }
                </Droppable>
            </DragDropContext>
            <div className="order-send">
                <button
                    className="order-send-button"
                    onClick={handleClickOrder}
                >Uredi</button>
            </div>
        </div>

    )
}