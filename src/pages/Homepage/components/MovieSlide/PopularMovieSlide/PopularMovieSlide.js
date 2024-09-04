import React from 'react'
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies';
import '../../../../../common/LoadingSpinner/LoadingSpinner.style.css'
import '../../../../../common/Error/Error.style.css';
import { responsive } from '../../../../../constant/responsive/responsive';
import MovieSlide from '../../../../../common/MovieSlide/MovieSlide';

const PopularMovieSlide = () => {
  const {data, isLoading, isError, error} = usePopularMoviesQuery();
  
  

  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }
  return (
    <>
      <MovieSlide
        movies={data.results}
        responsive={responsive} 
        title='Popular Movie'/>
    </>
  )
}

export default PopularMovieSlide