// Файл main.js

import { fetchImages } from './js/pixabay-api.js';
import { displayImages, displayToast } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadButton = document.querySelector('.load-button');

class ImageSearchApp {
  constructor() {
    this.page = 1;
    this.perPage = 15;
    this.searchData = '';
    this.totalHits = 0;

    searchForm.addEventListener('submit', this.handleSearch.bind(this));
    loadButton.addEventListener('click', this.loadMoreImages.bind(this));

    loadButton.classList.add('is-hidden');
    loader.classList.add('is-hidden');
  }

  async handleSearch(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    this.page = 1;
    this.searchData = event.target.elements.search_input.value.trim();

    if (this.searchData === '') {
      displayToast('Please enter a search term.', 'warning');
      return;
    }

    loader.classList.remove('is-hidden');
    loadButton.classList.add('is-hidden');

    try {
      const images = await fetchImages(
        this.searchData,
        this.page,
        this.perPage
      );
      loader.classList.add('is-hidden');
      this.totalHits = images.totalHits;

      if (images.totalHits === 0) {
        displayToast(
          'Sorry, there are no images matching your search query. Please try again!',
          'error'
        );
        return;
      }

      displayImages(images.hits, gallery);

      if (images.totalHits > this.perPage) {
        loadButton.classList.remove('is-hidden');
      } else {
        loadButton.classList.add('is-hidden');
      }
    } catch (error) {
      loader.classList.add('is-hidden');
      displayToast(
        'An error occurred while fetching images. Please try again later.',
        'error'
      );
    } finally {
      event.target.reset();
    }
  }

  async loadMoreImages() {
    try {
      this.page += 1;
      loader.classList.remove('is-hidden');
      loadButton.classList.add('is-hidden');

      const images = await fetchImages(
        this.searchData,
        this.page,
        this.perPage
      );
      loader.classList.add('is-hidden');

      if (images.hits.length === 0) {
        displayToast('No more images to load.', 'info');
        loadButton.classList.add('is-hidden');
        return;
      }

      displayImages(images.hits, gallery);

      if (this.page * this.perPage >= this.totalHits) {
        loadButton.classList.add('is-hidden');
        displayToast('You have reached the end of the search results.', 'info');
      } else {
        loadButton.classList.remove('is-hidden');
      }

      this.smoothScroll();
    } catch (error) {
      loader.classList.add('is-hidden');
      displayToast(
        'An error occurred while fetching images. Please try again later.',
        'error'
      );
    }
  }

  smoothScroll() {
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

new ImageSearchApp();
