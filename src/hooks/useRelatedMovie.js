import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';

const fetchRelatedMovies = (id) =>{
  return api.get(`/movie/${id}/recommendations`)
}

export const useRelatedMoviesQuery = (id) => {
  return useQuery({
    queryKey: ['movie-related',id],
    queryFn: ()=> fetchRelatedMovies(id),
    select: (result) => result.data
  })
}