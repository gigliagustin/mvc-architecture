import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.SECRET_PWD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE
};

const connection = await mysql.createConnection(config);

export class MoviesModel {
  static getAllMovies = async ({ genre }) => {
    const genreLowerCase = genre.toLowerCase();

    const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) =?', [genreLowerCase]);
    if (genres.length === 0) return [];

    const [{ id }] = genres;
    const [moviesByGenre] = await connection.query('SELECT BIN_TO_UUID(movie.id) id, movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate FROM movie INNER JOIN movie_genres ON genre_id = ?', [id]);

    if (moviesByGenre.length > 0) return moviesByGenre;

    const [movies] = await connection.query('select BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate from movie;');

    return movies;
  };

  static async getMovieById ({ movieId }) {
    const [movieById] = await connection.query('SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [movieId]);

    if (movieById.length === 0) return null;

    return movieById[0];
  }

  static async createMovie ({ input }) {

  }

  static async deleteMovie ({ movieId }) {

  }

  static async updateMovie ({ movieId, input }) {

  }
}
