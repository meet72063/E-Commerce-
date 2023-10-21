import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

export function fetchProducts({
  minPrice,
  maxPrice,
  rating,
  pageNumber,
  sort,
  category,
  brand,
}) {
  if (rating === null) {
    rating = 0;
  }

  return axios.get(
    `${url}/api/products?minPrice=${minPrice}&&maxPrice=${maxPrice}&&rating=${rating}&&pageNumber=${pageNumber}&&sort=${sort}&&category=${category}&&brand=${brand}`
  );
}
export function fetchCategories() {
  return axios.get(`${url}/api/products/getCategories`);
}
export function fetchBrands() {
  return axios.get(`${url}/api/products/getBrands`);
}

export function getProduct(productId) {
  return axios.get(`${url}/api/products/getProduct/${productId}`);
}

export function searchProduct(keyword) {
  return axios.get(`${url}/api/products/searchProduct/${keyword}`);
}
