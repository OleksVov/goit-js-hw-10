export default function createCountryCards (countries) {
    countries.map(country => {
        return `<h2><img src="${country.flags.svg}" alt="${country.name.official}" width=24px/> ${country.name.official}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(", ")}</p>
        `;
    })
.join("")
};