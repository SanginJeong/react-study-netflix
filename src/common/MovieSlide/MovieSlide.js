import React from 'react'
import './MovieSlide.style.css'
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlide = ({title,responsive,movies}) => {
  return (
    <div className='slide-wrap'>
      <h2>{title}</h2>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}
      >
        {movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
      </Carousel>
    </div>
  )
}

export default MovieSlide