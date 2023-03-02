import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    box: document.querySelector('.country-info'),
};

// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/name/peru

function fetchCountries(name) {
    
}