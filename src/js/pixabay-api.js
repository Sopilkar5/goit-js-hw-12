import axios from "axios";

const API_KEY = "48661661-399e17c2888aa32e2cfb6a652";

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40, 
      },
    });

    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error("Error fetching images: ", error.response?.data || error.message);
    throw new Error("Unable to fetch images.");  
  }
};

