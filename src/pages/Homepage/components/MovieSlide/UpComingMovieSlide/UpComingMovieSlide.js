import React from 'react'
import {useUpcomingMoviesQuery} from '../../../../../hooks/useUpComingMovies';
import '../../LoadingSpinner/LoadingSpinner.style.css';
import '../../Error/Error.style.css';
import MovieSlide from '../../../../../common/MovieSlide/MovieSlide';
import { responsive } from '../../../../../constant/responsive/responsive';

const UpComingMovieSlide = () => {
  const {data, isLoading, isError, error} = useUpcomingMoviesQuery();

  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }
  return (
    <MovieSlide
      title='UpComing Movie'
      responsive={responsive}
      movies = {data.results}
    />
  )
}

export default UpComingMovieSlide