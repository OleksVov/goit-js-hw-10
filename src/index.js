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

    const countryName = refs.input.value.trim();
    console.log(countryName);

    API.fetchCountries(countryName)
    .then(renderCountryCards)
    .catch(onFetchError)
    .finally();
}


function renderCountryCards (countries) {
    console.log(countries.length);
    if (countries.length >= 2 && countries.length <= 10) {
        const markupList = countries.map(country => {
        return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width=24px/> ${country.name.official}</li>`
    }).join("");
    refs.countryList.innerHTML = markupList;}

    if (countries.length === 1) {const markup = countries.map(country => {
        return `<h2><img src="${country.flags.svg}" alt="${country.name.official}" width=24px/> ${country.name.official}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(", ")}</p>
        `;
    })
.join("");
refs.countryInfo.innerHTML = markup;}

if (countries.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

    
};


function onFetchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

