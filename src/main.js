import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showErrorMessage } from './js/render-functions.js';
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector("button");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.getElementById("load-more-btn");
const loadMoreIndicator = document.getElementById("load-more-indicator");

let currentPage = 1; 
let currentQuery = ""; 

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

  gallery.innerHTML = "";
  loadMoreBtn.style.display = "none"; 

  loader.style.display = "block"; 

  try {
    const images = await fetchImages(currentQuery, currentPage);
    renderImages(images);

    if (images.length > 0) {
      gallery.insertAdjacentElement("afterend", loadMoreBtn); 
      loadMoreBtn.style.display = "block"; 
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
    const images = await fetchImages(currentQuery, currentPage);
    renderImages(images);

    if (images.length === 0) {
      loadMoreBtn.style.display = "none"; 
    }
  } catch (error) {
    showErrorMessage("Failed to fetch more images. Please try again later.");
  } finally {
    loader.style.display = "none"; 
  }
});



const showLoadingIndicator = () => {
  loader.style.display = "block";
};

const hideLoadingIndicator = () => {
  loader.style.display = "none";
};
