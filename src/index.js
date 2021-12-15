import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
import API from './fetchCountries';

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  liCountryList: document.querySelector('.contry-list__about'),
};

const DEBOUNCE_DELAY = 300;

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
refs.countryList.addEventListener('click', addCountryFromLink);

function addCountryFromLink(event) {
  API.fetchCountries(event.target.textContent)
    .then(definitionСall)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
  refs.countryList.innerHTML = '';

  refs.searchForm.value = event.target.textContent;
}

function onSearch(evt) {
  evt.preventDefault();

  const countryName = evt.target.value;

  if (countryName.trim() === '') {
    clearHTML();
    return;
  }

  clearHTML();

  API.fetchCountries(countryName)
    .then(definitionСall)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function clearHTML() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function definitionСall(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (data.length === 1) {
    addExclusiveCounry(data);
    return;
  }

  addListContry(data);
}

function addListContry(lists) {
  const Contrys = lists
    .map(({ flags, name }) => {
      return `
      <li class="contry-list__about">
        <img class="contry-list__img" src="${flags.svg}" alt="flag">
        <h2 class="contry-list__title">${name.official}</h2>
      </li>
      `;
    })
    .join('');
  refs.countryList.innerHTML = Contrys;
}

function addExclusiveCounry(lists) {
  const aboutContry = lists
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <h2 class="contry-info__title">${name.official}</h2>
      <div class="contry-info__body">
        <img class="contry-info__img" src="${flags.svg}" alt="flag">
        <ul>
          <li><b>Capital:</b> ${capital}</li>
          <li><b>Population:</b> ${population}</li>
          <li><b>Languages:</b> ${Object.values(languages)}</li>
        </ul>
      </div>
      `;
    })
    .join('');
  refs.countryInfo.innerHTML = aboutContry;
}
