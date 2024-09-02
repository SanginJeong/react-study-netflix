import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';

const fetchTopratedMovies = () =>{
  return api.get('/movie/top_rated')
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top_rated'],
    queryFn: fetchTopratedMovies,
    select: (result) => result.data
  })
}