import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nst-backend-blw1.onrender.com/api', 
});

export const getFaqs = (category) => {
  const url = category && category !== 'All' ? `/faqs?category=${category}` : '/faqs';
  return api.get(url);
};

export const createFaq = (faqData) => api.post('/faqs', faqData);
export const getStudents = () => api.get('/students');
export const getQueries = () => api.get('/queries');
export const createQuery = (queryData) => api.post('/queries', queryData);

export default api;