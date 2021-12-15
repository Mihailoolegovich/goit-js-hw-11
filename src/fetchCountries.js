const BAS_URL = 'https://restcountries.com/v3.1';
const FIELDS = 'fields=name,capital,population,flags,languages';

function fetchCountries(byName) {
  return fetch(`${BAS_URL}/name/${byName}?${FIELDS}`).then(response => {
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    return response.json();
  });
}
export default { fetchCountries };
