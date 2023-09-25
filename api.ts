import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_KEY} from '@env'


const baseUrl = "https://api.themoviedb.org/3";

type GenreResponse = { genres: { id: number; name: string }[] };

type MovieDetailsResponse = {
  production_countries: { iso_3166_1: string; name: string }[];
};

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<any, void>({
      query: () => `movie/popular?api_key=${API_KEY}`,
    }),
    searchMovies: builder.query({
      query: (searchQuery) =>
        `/search/movie?query=${searchQuery}&api_key=${API_KEY}`,
    }),
    getGenres: builder.query<GenreResponse, void>({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
    }),
    getMovieDetails: builder.query<MovieDetailsResponse, number>({
      query: (id) => `movie/${id}?api_key=${API_KEY}`,
    }),
    
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
