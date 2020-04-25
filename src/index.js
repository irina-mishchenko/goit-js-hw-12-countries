import './styles.css';
import _ from 'lodash';
import countriesTemplate from './country-card.hbs';
import countryService from './search_country_service.js';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, defaults, Stack } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css'

const refs = {
  searchForm: document.querySelector('#search_form'),
  card: document.querySelector('.js-country-card'),
};

refs.searchForm.addEventListener(
  'input',
  _.debounce(searchFormSubmitHandler, 2000),
);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  clearMarkup();

  const inputValue = e.target.value;
  countryService.searchQuery = inputValue;
  e.target.value = '';

  countryService
    .fetchCountry()
    .then(data => {
      if (data.length < 2) {
        buildCardCountry(data);
      } else if ((data.length > 2) & (data.length < 10)) {
        buildCardCountryList(data);
      } else if (data.length > 10) {
        alert({
          text: 'Too many matches found. Please enter a more specific query!',
          maxTextHeight: null,
          width: '400px;',
        });
      } else
        error({
          text: 'No such country found.',
          maxTextHeight: null,
          width: '400px;',
        });
    })
    .catch(error => console.log(error));
}

function buildCardCountry(item) {
  const markup = countriesTemplate(item);

  refs.card.insertAdjacentHTML('beforeend', markup);
}

function buildCardCountryList(items) {
  const markup = items.map(item =>
    refs.card.insertAdjacentHTML('beforeend', `<li>${item.name}</li>`),
  );
}

function clearMarkup() {
  refs.card.innerHTML = ' ';
}
