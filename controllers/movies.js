import { validateMovie, validateParamsMovie } from '../schemas/schemas.js';

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel;
  }

  getAllMovies = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAllMovies({ genre });
    res.json(movies);
  };

  getMovieById = async (req, res) => {
    const { movieId } = req.params;
    const movie = await this.movieModel.getMovieById({ movieId });

    if (!movie) {
      res.status(404).json({ message: `Movie with id ${movieId} not found` });
    } else {
      res.json(movie);
    }
  };

  createMovie = async (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const newMovie = await this.movieModel.createMovie({ input: result.data });
    res.status(201).json(newMovie);
  };

  updateMovie = async (req, res) => {
    const result = validateParamsMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const { movieId } = req.params;

    const updatedMovie = await this.movieModel.updateMovie({ movieId, input: result.data });

    res.json(updatedMovie);
  };

  deleteMovie = async (req, res) => {
    const { movieId } = req.params;
    const result = await this.movieModel.deleteMovie({ movieId });

    if (!result) {
      return res.status(404).json({ message: `Movie with id ${movieId} not found` });
    }

    return res.json({ message: 'Movie deleted' });
  };
}
