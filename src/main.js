'use strict';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages, displayToast } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadButton = document.querySelector('.load-button');
export let page = 1;
export let perPage = 15;
let searchData = '';

loadButton.classList.add('is-hidden');
loader.classList.add('is-hidden');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchData = event.target.elements.search_input.value.trim();

  if (searchData === '') {
    displayToast('Please enter a search term.', 'warning');
    return;
  }

  loader.classList.remove('is-hidden');
  loadButton.classList.add('is-hidden');

  try {
    const images = await fetchImages(searchData, page, perPage);
    loader.classList.add('is-hidden');

    if (images.total === 0) {
      displayToast(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
      return;
    }

    displayImages(images.hits, gallery);

    if (images.totalHits > perPage) {
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
});

loadButton.addEventListener('click', async () => {
  try {
    page += 1;
    loader.classList.remove('is-hidden');
    loadButton.classList.add('is-hidden');

    const images = await fetchImages(searchData, page, perPage);
    loader.classList.add('is-hidden');

    if (images.hits.length === 0) {
      displayToast('No more images to load.', 'info');
      loadButton.classList.add('is-hidden');
      return;
    }

    displayImages(images.hits, gallery);

    if (page * perPage >= images.totalHits) {
      loadButton.classList.add('is-hidden');
    } else {
      loadButton.classList.remove('is-hidden');
    }
  } catch (error) {
    loader.classList.add('is-hidden');
    displayToast(
      'An error occurred while fetching images. Please try again later.',
      'error'
    );
  }
});
