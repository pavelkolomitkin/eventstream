import axios from 'axios';

axios.defaults.baseURL = process.env.API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;