// Файл render-functions.js

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function displayImages(images, gallery) {
  const markup = images
    .map(
      image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <div class="full-image" class="loader">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
                    <ul class="image-button">
                        <li><p class="info-name">Likes</p><p>${image.likes}</p></li>
                        <li><p class="info-name">Views</p><p>${image.views}</p></li>
                        <li><p class="info-name">Comments</p><p>${image.comments}</p></li>
                        <li><p class="info-name">Downloads</p><p>${image.downloads}</p></li>
                    </ul>
                </div>
            </a>
        </li>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function displayToast(message, type) {
  iziToast[type]({
    message,
    messageColor: 'white',
    position: 'bottomRight', // Для місцерозташування вспливаючого вікна. Можна використовувати 'bottomRight', 'bottomLeft' або 'bottomCenter'
    backgroundColor: 'red',
  });
}
