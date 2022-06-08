import exp from "constants";
import mysql from "mysql2/promise"; 

const connection = await mysql.createConnection({ 
    host: '127.0.0.1',
    //port: 3307,
    user: 'vmadmin',
    password: 'sml12345',
    database: 'moviedb',
}); 

await connection.connect(); 

export async function getAll(uid) {
    const query = 'SELECT movie.id, movie.title, movie.year, movie.isPublic, movie.ownerId, Ratings.rating, avgRating.avgrating FROM movie LEFT JOIN (SELECT Ratings.movie AS movieId, AVG(Ratings.rating) AS avgrating FROM Ratings GROUP BY Ratings.movie) avgRating ON avgRating.movieId = movie.id LEFT JOIN Ratings ON Ratings.user = ? AND Ratings.movie = movie.id WHERE isPublic = true OR ownerId = ?';
    const [data] = await connection.query(query, [uid, uid]);
    return data;
  }
  
  async function insert(movie) {
    const query = 'INSERT INTO movie (title, year, isPublic, ownerId) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [movie.title, movie.year, movie.isPublic, movie.ownerId]);
    return { ...movie, id: result.insertId };
  }
  
  async function update(movie) {
    const query = 'UPDATE movie SET title = ?, year = ?, isPublic = ?, ownerId = ? WHERE id = ?';
    await connection.query(query, [movie.title, movie.year, movie.isPublic, movie.ownerId, movie.id]);
    return movie;
  }
  
  export async function get(id) {
    const query = 'SELECT * FROM movie WHERE id = ?';
    const [data] = await connection.query(query, [id]);
    return data.pop();
  }
  
  export async function remove(id) {
    const query = 'DELETE FROM movie WHERE id = ?';
    await connection.query(query, [id]);
    return;
  }

  export async function saveRating(rating){
    const query = 'SELECT * FROM Ratings WHERE user = ? AND movie = ?';
    const [data] = await connection.query(query, [rating.user, rating.movie]);

    console.log("length: " + data.length);

    if(data.length > 0){
      console.log("1");
      updateRating(rating);
    }
    else{
      console.log("2");
      insertRating(rating);
    }
  }

  export async function updateRating(rating){
    const query = 'UPDATE Ratings SET user = ?, movie = ?, rating = ? WHERE movie = ? AND user = ?'
    await connection.query(query, [rating.user, rating.movie, rating.rating, rating.movie, rating.user]);
    return;
  }

  export async function insertRating(rating){
    const query = 'INSERT INTO Ratings (user, movie, rating) VALUES (?, ?, ?)'
    await connection.query(query, [rating.user, rating.movie, rating.rating]);
    return;
  }
  
  export function save(movie) {
    if (!movie.id) {
      return insert(movie);
    } else {
      return update(movie);
    }
  }