const express = require('express');
const cors = require('cors');
const dataMovies = require('./data/movies.json');
const { response } = require('express');


// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const moviesFilter = dataMovies.filter((item) => item.gender === genderFilterParam)
  console.log(genderFilterParam)
  const response = {
    success: true,
    movies: moviesFilter,
  };

  res.json(response);
});
