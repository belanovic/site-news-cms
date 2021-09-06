import HOST_BACKEND from './hostBackend.js';

export async function getAllArticles() {
    console.log(localStorage.getItem('x-auth-token'));
    try {
        const response = await fetch(`${HOST_BACKEND}/allArticles`, { 
            headers: {
                /* 'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem('x-auth-token') */
                'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token')
   
            }
        });
        const allNews = await response.json();
        return allNews
    }
    catch (err) {
        console.log(err); 
    }
}

export async function getArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`);
        const selectedArticle = await response.json();
        return selectedArticle
    }
    catch(err) {
        console.log(err);
    }
}
export async function postArticle({id, title, subtitle, text, paragraphs, note, imgURL, imgName, 
                                tagsArr, imgURL2, imgName2,
                                dateUpdated, dateCreated, datePublished, videoURL, videoName,
                                category, position, published, videoDescription, imgDescription, author, source}) {
    try {
        const newArticle = await fetch(`${HOST_BACKEND}/oneArticle/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                text: text,
                paragraphs: paragraphs,
                note: note,
                imgURL: imgURL,
                imgName: imgName,
                imgURL2: imgURL2,
                imgName2: imgName2,
                videoURL: videoURL,
                videoName: videoName,
                dateUpdated: dateUpdated,
                dateCreated: dateCreated,
                datePublished: datePublished,
                category: category,
                position: position,
                published: published,
                imgDescription: imgDescription,
                videogDescription: videoDescription,
                source: source,
                author: author,
                tagsArr: tagsArr

            })
        })
        return newArticle
    }
    catch (err) {
        console.log(err);
    }
}

export async function updateArticle({id, title, subtitle, text,  paragraphs, note, imgURL2, imgName2,
                                    imgURL, imgName, videoURL, videoName, position, 
                                    category, published, datePublished, tagsArr,
                                    imgDescription, videoDescription, author, source}) {
    try {
        const updatedArticle = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                text: text,
                paragraphs: paragraphs,
                note: note,
                imgURL: imgURL,
                imgName: imgName,
                imgURL2: imgURL2,
                imgName2: imgName2,
                videoURL: videoURL,
                videoName: videoName,
                dateUpdated: Date(),
                datePublished: datePublished,
                category: category,
                position: position,
                published: published,
                imgDescription: imgDescription,
                videoDescription: videoDescription,
                source: source,
                author: author, 
                tagsArr: tagsArr
            })
        })
        return updatedArticle;
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        const deletedArticle = response.json();
        return deletedArticle
    }
    catch (err) {
        console.log(err);
    }
}

export async function getFrontpageNews() {
    try {
        const response = await fetch(`${HOST_BACKEND}/frontpageArticles`);
        const newsFrontpage = await response.json();
        return newsFrontpage
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateArticlePosition(id, position) {
    try {
        const updatedArticle = await fetch(`${HOST_BACKEND}/articlePosition/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                position: position
            })
        })
        return updatedArticle
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateFrontpage(idAndPositionArr) {
    try {
        const response = await fetch(`${HOST_BACKEND}/updateFrontpage`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                idAndPositionArr: idAndPositionArr
            })
        })
        const updatedFrontpage = response.json();
        return updatedFrontpage
    }
    catch (err) {
        console.log(err)
    }
}

export async function getByCategory(category) {
    try {
        const response = await fetch(`${HOST_BACKEND}/category/${category}`);
        const newsByCategory = await response.json();
        return newsByCategory
    }
    catch (err) {
        console.log(err)
    }
}

export async function getByDate(date) {
    console.log('poslat zahtev');
    try {
        const response = await fetch(`${HOST_BACKEND}/articlesByDate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                day: date.day,
                month: date.month,
                year: date.year
            })
        })
        const articlesByDate = response.json();
        return articlesByDate
    }
    catch (err) {
        console.log(err)
    }
}

export async function publishArticle(id) {
    try {
        const response = await fetch(`${HOST_BACKEND}/publishArticle/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                published: true,
                datePublished: Date(), 
                dateUpdated: Date()
            })
        })
        const publishedArticle = response.json();
        return publishedArticle
    }
    catch (err) {
        console.log(err)
    }
}
export async function scrape(url) {
    try {
        const response = await fetch(`${HOST_BACKEND}/scraper`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                url: url
            })
        })
        const scrapedArticle = await response.json();
        return scrapedArticle
    }
    catch (err) {
        console.log(err)
    }
}

export async function publishTwit(twit) {
    const r = await fetch(`${HOST_BACKEND}/publishTwit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
            twit: twit
        })
    }
    )
    return r
}