
function fetchCountries(countryName) {
    return fetch (`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,languages,flags`)
    .then(response => {
        if (!response.ok) {
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
    });
};

export default { fetchCountries };