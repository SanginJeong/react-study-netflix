import api from '../utils/api';
import {useQuery} from '@tanstack/react-query';

const fetchSearchMovie = ({ keyword, page, genre }) => {

  let url = '/movie/popular'; 
  
  if (keyword) {
    url = `/search/movie?query=${keyword}&page=${page}`;
  } else if (genre) {
    url = `/discover/movie?with_genres=${genre}&page=${page}`;
  }
  
  return api.get(url);
};

export const useSearchMovieQuery = ({ keyword, page, genre }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page, genre }],
    queryFn: () => fetchSearchMovie({ keyword, page, genre }),
    select: (result) => result.data,
  });
};