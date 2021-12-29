const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_URL = '24820519-59aa99241bf38d02e4bce65a9';

export default class ApiService {
  constructor() {
    this.inputName = '';
    this.pageNum = 1;
  }

  async fetchCountries() {
    const options = new URLSearchParams({
      key: `${KEY_URL}`,
      q: `${this.inputName}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${this.pageNum}`,
      per_page: '40',
    });

    try {
      const response = await axios.get(`?${options}`);
      const result = await response.data;

      this.incrementPage();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.pageNum += 1;
  }

  resetPage() {
    this.pageNum = 1;
  }

  get qeury() {
    return this.inputName;
  }

  set qeury(newQeury) {
    this.inputName = newQeury;
  }
}
