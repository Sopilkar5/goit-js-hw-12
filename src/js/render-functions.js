import iziToast from "izitoast";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderImages = (images) => {
  const gallery = document.getElementById("gallery");

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("gallery-card");

    const link = document.createElement("a");
    link.href = image.largeImageURL;
    link.classList.add("gallery-link");

    const imgElement = document.createElement("img");
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.classList.add("gallery-image");

    const info = document.createElement("div");
    info.classList.add("image-info");
    info.innerHTML = `
      <p><strong>Likes:</strong> ${image.likes}</p>
      <p><strong>Views:</strong> ${image.views}</p>
      <p><strong>Comments:</strong> ${image.comments}</p>
      <p><strong>Downloads:</strong> ${image.downloads}</p>
    `;

    link.appendChild(imgElement);
    card.appendChild(link);
    card.appendChild(info);

    gallery.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
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