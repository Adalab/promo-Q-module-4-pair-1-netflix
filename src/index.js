const express = require('express');
const cors = require('cors');
const dataMovies = require('./data/movies.json');
const users = require('./data/users.json');
const { response } = require('express');



// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//Set EJS.
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const moviesFilter = dataMovies.filter((item) => 
  genderFilterParam
   ?item.gender === genderFilterParam
   :true)

  console.log(moviesFilter)
  const response = {
    success: true,
    movies: moviesFilter,
  };

  res.json(response);
});

server.post('/users', (req, res) => {
  console.log(req.body);
  const userFound = users.find(item => item.email === req.body.email && item.password === req.body.password);
  console.log(userFound)
  const result = { success: Boolean(userFound) }
  if (userFound) {
    result.userId = userFound.id
  }
  else {
    result.errorMessage = 'usuaria/o no encontrada/o'
  }

  console.log(result)
  res.json(result)
});

server.get('/movie/:movieId', (req, res) => {
  const id = req.params.movieId;
  const foundMovie = dataMovies.find(movie => movie.id === id)
  console.log(foundMovie)
  res.render('pages/movies', foundMovie);
 });

const staticServer = './src/public-react/';
server.use(express.static(staticServer));

const staticImage = './src/public-movies-images/';
server.use(express.static(staticImage));

const staticStyles = './src/public-css';
server.use(express.static(staticStyles));


