import API from'./fetchCountries';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));


function  onSearchCountry (event) {
    event.preventDefault();

    const countryName = event.target.value.trim();

    clearField ()

    API.fetchCountries(countryName)
    .then(countries => {createCountryCards(countries)})
    .catch(onFetchError)
};


function createCountryCards(countries) {
    if (countries.length >= 2 && countries.length <=10) {
        renderCountryList(countries);
        refs.countryInfo.innerHTML = "";
    } else if (countries.length === 1) {renderCountryCards(countries);
        refs.countryList.innerHTML = "";}
    else ( Notiflix.Notify.info("Too many matches found. Please enter a more specific name."))
};


function renderCountryCards (countries) {
    const markup = countries.map(country => {
        return `<h2><img src="${country.flags.svg}" alt="${country.name.official}" width=24px/> ${country.name.official}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(", ")}</p>`;
    })
.join("");
refs.countryInfo.innerHTML = markup;
};


function renderCountryList (countries) {
    const markup = countries.map(country => {
        return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width=24px/> ${country.name.official}</li>`;
    })
.join("");
refs.countryList.innerHTML = markup;
};


function onFetchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
};

function clearField () {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";
};

