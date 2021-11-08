// const HOST_BACKEND = 'https://site-news-backend.herokuapp.com';
// const HOST_BACKEND = 'http://localhost:4000';

const HOST_BACKEND = process.env.HOST_BACKEND || 'http://localhost:4000';

export default HOST_BACKEND;