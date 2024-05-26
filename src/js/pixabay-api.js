// Файл pixabay-api.js

import axios from 'axios';

const API_KEY = '44048092-3090edf6b3c3e0216bf005362';
const BASE_URL = 'https://pixabay.com/api/';

class PixabayAPI {
  constructor() {
    if (!PixabayAPI.instance) {
      this.apiKey = API_KEY;
      this.baseUrl = BASE_URL;
      PixabayAPI.instance = this;
    }
    return PixabayAPI.instance;
  }

  async fetchImages(query, page = 1, perPage = 15) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          key: this.apiKey,
          q: query,
          image_type: 'photo',
          per_page: perPage,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch images. Please try again later.');
    }
  }
}

const pixabayAPI = new PixabayAPI();
export const fetchImages = pixabayAPI.fetchImages.bind(pixabayAPI);
