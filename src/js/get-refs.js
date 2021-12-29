export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    searchBtn: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('.load-more'),
  };
}
