import React from 'react'
import './MovieCard.style.css';

const MovieCard = ({movie}) => {
  return (
    <div 
      className='movie-card'
      style={{
      backgroundImage: `url('https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path}')`
    }}>

      <div className='overlay'>
        <h2 className='movie-title'>{movie.title}</h2>
        <div className='movie-genre-area'>
          {movie.genre_ids.map((id)=>(<div className='movie-genre'>{id}</div>))}
          {movie.adult 
            ? <div className='movie-adult'>19+</div>
            : <div className='movie-all'>ALL</div>
          }
        </div>
        <div className='movie-info'>
          <div className='movie-average-area'>
            <h3>Review Score : </h3>
            <h3 className='movie-average'>{movie.vote_average.toFixed(2)}</h3>
          </div>
          <div className="movie-popularity-area">
            <h3>Popularity : </h3>
            <h3 className='movie-popularity'>{movie.popularity}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard