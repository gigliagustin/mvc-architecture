import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAllMovies);
moviesRouter.get('/:movieId', MovieController.getMovieById);
moviesRouter.post('/', MovieController.createMovie);
moviesRouter.patch('/:movieId', MovieController.updateMovie);
moviesRouter.delete('/:movieId', MovieController.deleteMovie);
