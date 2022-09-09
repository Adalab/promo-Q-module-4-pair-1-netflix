const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
/* const dataMovies = require('./data/movies.json'); */
// const users = require('./data/users.json');
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

// database

const db = new Database('./src/db/database.db', { verbose: console.log });



server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const queryAll = db.prepare(`SELECT * FROM movies`);
  const query = db.prepare(`SELECT * FROM movies WHERE gender = ? `);
  const movies = genderFilterParam ? query.all(genderFilterParam) : queryAll.all();
  const response = {
    success: true,
    movies: movies,
  };
  const sortFilterParams = req.query.sort;

  console.log(req.query.gender);
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
  const queryId = db.prepare(`SELECT * FROM movies WHERE id = ?`);
  const movieId = queryId.get(id);
  /* const foundMovie = dataMovies.find(movie => movie.id === id)
  console.log(foundMovie) */
  console.log(id);
  res.render('pages/movies', movieId);
});

const usersDb = new Database('./src/db/users.db', { verbose: console.log });

server.post('/sign-up', (req, res) => {
  const userData = req.body;
  const userEmail = req.body.email;

  const queryEmail = usersDb.prepare(`SELECT * FROM users WHERE email = ?`);
  const user = queryEmail.get(userEmail);
  console.log(user)

  const result = {};

  if (user) {
    result.success = false;
    result.errorMessage = "Usuaria ya existente";

  } else {
      const query = usersDb.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)
      const queryResult = query.run(req.body.email, req.body.password);
      result.success = true;
      result.userId = queryResult.lastInsertRowid;
    };
 
  res.json(result)
});

const staticServer = './src/public-react/';
server.use(express.static(staticServer));

const staticImage = './src/public-movies-images/';
server.use(express.static(staticImage));

const staticStyles = './src/public-css';
server.use(express.static(staticStyles));


