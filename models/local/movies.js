import { readJSON } from '../../utils/readJsonUtil.js';
import { randomUUID } from 'node:crypto';

const movies = readJSON('../../movies.json');
export class MoviesModel {
  static getAllMovies = async ({ genre }) => {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  };

  static async getMovieById ({ movieId }) {
    const movie = movies.find(movie => movie.id === movieId);
    return movie;
  }

  static async createMovie ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async deleteMovie ({ movieId }) {
    const movieIndex = movies.findIndex(movie => movie.id === movieId);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async updateMovie ({ movieId, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    if (movieIndex === -1) return false;
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    };

    return movies[movieIndex];
  }
}
