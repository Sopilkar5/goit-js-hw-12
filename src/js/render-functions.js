import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById("gallery");
const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const scrollToNewImages = () => {
  const galleryCards = document.querySelectorAll(".gallery-card");

  if (galleryCards.length > 0) {
    const cardHeight = galleryCards[0].getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2, 
      behavior: "smooth", 
    });
  }
};

export const renderImages = (images) => {
  if (images.length === 0) {
    showNoResultsMessage();
    return;
  }

  gallery.innerHTML += images.map(image => `
    <div class="gallery-card">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image">
      </a>
      <div class="image-info">
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
      </div>
    </div>
  `).join('');

  lightbox.refresh();
  scrollToNewImages();
};

export const showNoResultsMessage = () => {
  iziToast.error({
    message: "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    backgroundColor: `#ef4040`,
    onOpening: function () {
      const toastElement = document.querySelector('.iziToast');
      if (toastElement) {
        toastElement.style.borderBottom = '2px solid #ffbebe';
        toastElement.style.borderRadius = '4px';
        toastElement.style.padding = '20px';
        toastElement.style.width = '432px';
        toastElement.style.height = '88px';
      }
    }
  });
};

export const showErrorMessage = (message) => {
  iziToast.error({
    title: "Error",
    message: message,
    position: "topRight",
  });
};
