import './sass/sass-style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './js/get-refs';
import ApiService from './js/fetchCountries';
import addGallery from './js/render-gallery';
import loadMore from './js/load-more';

const refs = getRefs();
const newApiService = new ApiService();
const loadMoreBtn = new loadMore({selector:'.load-more'});
  
let numDownloads = 0;

refs.searchForm.addEventListener('submit', searchNewEl);
loadMoreBtn.refs.button.addEventListener('click', searchQuery);


function searchNewEl(e) {
  e.preventDefault();

  const inputData = e.currentTarget.elements.searchQuery.value;

  numDownloads = 0;
  loadMoreBtn.hide();
  refs.gallery.innerHTML = '';

  if (inputData === '') {
    return errorMessage();
  }

  newApiService.qeury = inputData;
  newApiService.resetPage();

  newApiService.fetchCountries()
  .then(data => {

    if (data.hits.length === 0) {
      return errorMessage();
    }

    submitMessageOutput(data)
    definitionСall(data);
  })
  .catch(error => console.log(error));
}


function submitMessageOutput(data) {
  loadMoreBtn.show();
  loadMoreBtn.disable();
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
}


function definitionСall(data) {
  numDownloads += data.hits.length;

  if (numDownloads === data.totalHits) {
    loadMoreBtn.hide();
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }

  refs.gallery.insertAdjacentHTML('beforeend', addGallery.renderListGalery(data));
  const lightbox = new SimpleLightbox('.gallery a');
  
  loadMoreBtn.enable();
 }

 
function searchQuery() {
  loadMoreBtn.disable();
  newApiService.fetchCountries().then(definitionСall);
  
}

function errorMessage() {
  return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}




