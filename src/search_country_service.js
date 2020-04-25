const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  query: '',
  fetchCountry() {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    return fetch(baseUrl + this.query, options).then(response => {
      return response.json();
    });
  },

  set searchQuery(string) {
    this.query = string;
  },
};