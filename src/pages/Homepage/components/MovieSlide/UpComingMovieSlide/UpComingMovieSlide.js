import React from 'react'
import {useUpcomingMoviesQuery} from '../../../../../hooks/useUpComingMovies';
import '../../LoadingSpinner/LoadingSpinner.style.css';
import '../../Error/Error.style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../MovieSlide.style.css';
import MovieCard from '../../MovieCard/MovieCard';

const UpComingMovieSlide = () => {
  const {data, isLoading, isError, error} = useUpcomingMoviesQuery();
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }
  return (
    <div className='slide-wrap'>
      <h2>UpComing Movies</h2>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}
      >
        {data.results.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
      </Carousel>
    </div>
  )
}

export default UpComingMovieSlide