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

// -----------------------------
// ----------------------------

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { createMarkup } from './js/render-functions';
// import fetchPhotos from './js/pixabai-api';

// const imgContainer = document.querySelector('.gallery');
// const searchForm = document.querySelector('.search-form');
// const loaderEl = document.querySelector('.loader');
// const fetchPhotosButton = document.querySelector('.photo-btn');

// let page = 1;
// let limit = 15;
// let currentSearchQuery = '';

// function showLoadMoreButton() {
//   fetchPhotosButton.classList.remove('is-hidden-btn');
// }

// function hideLoadMoreButton() {
//   fetchPhotosButton.classList.add('is-hidden-btn');
// }

// async function fetchAndDisplayPhotos(searchQuery, pageNumber) {
//   loaderEl.classList.remove('is-hidden');
//   try {
//     const imagesData = await fetchPhotos(searchQuery, pageNumber);
//     if (imagesData.hits.length === 0) {
//       iziToast.error({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//       hideLoadMoreButton();
//       fetchPhotosButton.removeEventListener('click', onLoadMore);
//     } else {
//       imgContainer.innerHTML += createMarkup(imagesData.hits);

//       const lightbox = new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionsDelay: 250,
//       });
//       lightbox.refresh();

//       const totalLoadedImages = pageNumber * limit;
//       if (totalLoadedImages >= imagesData.totalHits) {
//         hideLoadMoreButton();
//         fetchPhotosButton.removeEventListener('click', onLoadMore);
//         iziToast.info({
//           message: "We're sorry, but you've reached the end of search results.",
//         });
//       } else {
//         showLoadMoreButton();
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loaderEl.classList.add('is-hidden');
//   }
// }

// async function onLoadMore() {
//   page++;
//   await fetchAndDisplayPhotos(currentSearchQuery, page);
//   scrollPage();
// }

// fetchPhotosButton.addEventListener('click', onLoadMore);

// async function onSearch(event) {
//   event.preventDefault();
//   const searchQuery = event.target.elements.searchKeyword.value.trim();
//   imgContainer.innerHTML = '';
//   if (searchQuery === '') {
//     hideLoadMoreButton();
//     fetchPhotosButton.removeEventListener('click', onLoadMore);
//     return iziToast.error({
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//     });
//   }
//   currentSearchQuery = searchQuery;
//   loaderEl.classList.remove('is-hidden');

//   try {
//     page = 1;
//     await fetchAndDisplayPhotos(searchQuery, page);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     event.target.reset();
//     loaderEl.classList.add('is-hidden');
//   }
// }

// searchForm.addEventListener('submit', onSearch);

// function scrollPage() {
//   const { height: cardHeight } = document
//     .querySelector('.photo-container')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
