import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import '../LoadingSpinner/LoadingSpinner.style.css';
import './Banner.style.css';
import '../Error/Error.style.css';

const Banner = () => {
  const {data, isLoading, isError, error} = usePopularMoviesQuery()
  console.log('data:',data);
  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }
  return (
    <div 
      className='banner'
      style={{
      backgroundImage : 
      `url("https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${data?.results[0].poster_path}")`
    }}>
      <div className='banner_text_area'>
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner