 function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(response => {
        return response.json();
    });
}



export default  { fetchCountries };