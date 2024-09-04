import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../../hooks/useTopRatedMovies';
import '../../../../../common/LoadingSpinner/LoadingSpinner.style.css'
import '../../../../../common/Error/Error.style.css';
import MovieSlide from '../../../../../common/MovieSlide/MovieSlide';
import { responsive } from '../../../../../constant/responsive/responsive';

const TopRatedMovieSlide = () => {
  const {data, isLoading, isError, error} = useTopRatedMoviesQuery();

  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }
  return (
    <MovieSlide
      title='Top Rated Movie'
      responsive={responsive}
      movies = {data.results}
    />
  )
}

export default TopRatedMovieSlide