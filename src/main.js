'use strict';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages, displayToast } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  const searchData = event.target.elements.search_input.value.trim();
  if (searchData === '') {
    displayToast('All form fields must be filled in', 'warning');
    loader.classList.add('is-hidden');
    return;
  }

  try {
    const images = await fetchImages(searchData);
    if (images.total === 0) {
      displayToast('Sorry, no images found. Please try again!', 'error');
    } else {
      displayImages(images.hits, gallery);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    displayToast(
      'An error occurred while fetching images. Please try again later.',
      'error'
    );
  } finally {
    searchForm.reset();
    loader.classList.add('is-hidden');
  }
});
