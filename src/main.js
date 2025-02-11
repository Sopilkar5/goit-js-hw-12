import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showErrorMessage, showNoResultsMessage } from './js/render-functions.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector("button");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.getElementById("load-more-btn");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0; 

searchForm.classList.add("search-form");
searchInput.classList.add("search-input");
searchButton.classList.add("search-button");
gallery.classList.add("gallery");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    showErrorMessage("Please enter a search term.");
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0; 

  gallery.innerHTML = "";
  loadMoreBtn.style.display = "none"; 
  loader.style.display = "block"; 

  try {
    const { images, totalHits: total } = await fetchImages(currentQuery, currentPage);
    totalHits = total; 

    if (images.length === 0) {
      showNoResultsMessage(); 
      return;
    }

    renderImages(images);
    
    if (images.length > 0) {
      gallery.insertAdjacentElement("afterend", loadMoreBtn);
      loadMoreBtn.style.display = "block";
    }

    if (totalHits <= 40) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    showErrorMessage("Failed to fetch images. Please try again later.");
  } finally {
    loader.style.display = "none"; 
  }

  searchInput.value = "";
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  loadMoreBtn.insertAdjacentElement("afterend", loader);
  loader.style.display = "block"; 

  try {
    const { images, totalHits: total } = await fetchImages(currentQuery, currentPage);
    totalHits = total;

    if (images.length === 0) {
      loadMoreBtn.style.display = "none";
      return;
    }

    renderImages(images);

    const totalLoadedImages = (currentPage - 1) * 40 + images.length;

    if (totalLoadedImages >= totalHits) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    showErrorMessage("Failed to fetch more images. Please try again later.");
  } finally {
    loader.style.display = "none"; 
  }
});
