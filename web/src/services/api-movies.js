// login

const getMoviesFromApi = (params) => {
  console.log(params)
  console.log('Se están pidiendo las películas de la app');
  const genderParam = params.gender;
  const querySort = params.sort;
  const queryParams = `?gender=${genderParam}&sort=${querySort}`;
  return fetch('//localhost:4000/movies' + queryParams)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};


const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
