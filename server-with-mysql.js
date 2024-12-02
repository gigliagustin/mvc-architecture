import { createApp } from './app.js';
import { MoviesModel } from './models/mysql/movies.js';

createApp({ movieModel: MoviesModel });
