import axios from 'axios'

const PAGE = 12;
const KEY = '21940379-165654ee27b0a15257d8ffa36';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${KEY}&per_page=12`;

const fetchImg = ({ currentPage, searchQuery}) => {
    const fetchString = `https://pixabay.com/api/?key=${KEY}&per_page=${PAGE}&q=${searchQuery}&page=${currentPage}`;
    return axios
        .get(fetchString)
        .then(response => response.data)
        .catch(console.error);
};

export default fetchImg;