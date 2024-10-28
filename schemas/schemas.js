import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url(),
  genre: z.array(z.enum(['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Horror', 'Crime']))
});

export function validateMovie (movie) {
  return movieSchema.safeParse(movie);
}

export function validateParamsMovie (movie) {
  return movieSchema.partial().safeParse(movie);
}
