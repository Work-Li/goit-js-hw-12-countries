import debounce from 'lodash.debounce'

import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import countriesList from '../templates/country-list.hbs';
import countryCard from '../templates/country-card.hbs';
import fetch from '../js/fetchCountries';

const cardContainerEl = document.querySelector('.country-container');
const inputEl = document.querySelector('.input');

inputEl.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
    let searchQuery = inputEl.value;
    cardContainerEl.innerHTML = '';
    fetch.fetchCountries(searchQuery)
    .then(onRender)
    .catch(onError);
};

function onRender(data) {
    if (data.length > 10) {
       onError('Too many matches.Please enter a more specific query');

    } else if (data.length > 1 && data.length <= 10) {
       renderCountriesList(data);
    } else if (data.length === 1) {
       renderCountryCard(data);
    } else {
        onError('The country is not found')
    }
    
}

function renderCountryCard(country) {
    const markupCard = countryCard(country);
    cardContainerEl.innerHTML = markupCard;
}

function renderCountriesList(countries) {
    const markupList = countriesList(countries);
    cardContainerEl.innerHTML = markupList;
} 

function onError(message) {
   return error({
    text: message,
    title: 'Something went wrong',
    hide: true,
    delay: 2000,
    width: '100vw',
    styling: 'brighttheme',
    closer: false,
    sticker: false,
    icon: null
   
   });}