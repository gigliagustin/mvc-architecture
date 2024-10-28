import { MoviesModel } from '../models/movies.js';
import { validateMovie, validateParamsMovie } from '../schemas/schemas.js';

export class MovieController {
  static async getAllMovies (req, res) {
    const { genre } = req.query;
    const movies = await MoviesModel.getAllMovies({ genre });
    res.json(movies);
  }

  static async getMovieById (req, res) {
    const { movieId } = req.params;
    const movie = await MoviesModel.getMovieById({ movieId });

    if (!movie) {
      res.status(404).json({ message: `Movie with id ${movieId} not found` });
    } else {
      res.json(movie);
    }
  }

  static async createMovie (req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const newMovie = await MoviesModel.createMovie({ input: result.data });
    res.status(201).json(newMovie);
  }

  static async updateMovie (req, res) {
    const result = validateParamsMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const { movieId } = req.params;

    const updatedMovie = await MoviesModel.updateMovie({ movieId, input: result.data });

    res.json(updatedMovie);
  }

  static async deleteMovie (req, res) {
    const { movieId } = req.params;
    const result = await MoviesModel.deleteMovie({ movieId });

    if (!result) {
      return res.status(404).json({ message: `Movie with id ${movieId} not found` });
    }

    return res.json({ message: 'Movie deleted' });
  }
}
