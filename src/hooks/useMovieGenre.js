import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';

const fetchMovieGenre = () =>{
  return api.get('/genre/movie/list')
}

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000,
  })
}