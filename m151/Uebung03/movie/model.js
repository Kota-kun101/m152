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
    const query = 'SELECT * FROM movie WHERE isPublic = true OR ownerId = ?';
    const [data] = await connection.query(query, uid);
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
  
  export function save(movie) {
    if (!movie.id) {
      return insert(movie);
    } else {
      return update(movie);
    }
  }