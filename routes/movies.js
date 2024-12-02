import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });
  moviesRouter.get('/', movieController.getAllMovies);
  moviesRouter.get('/:movieId', movieController.getMovieById);
  moviesRouter.post('/', movieController.createMovie);
  moviesRouter.patch('/:movieId', movieController.updateMovie);
  moviesRouter.delete('/:movieId', movieController.deleteMovie);

  return moviesRouter;
};
