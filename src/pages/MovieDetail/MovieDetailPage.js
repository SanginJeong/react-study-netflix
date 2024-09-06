import React from 'react'
import {useParams} from 'react-router-dom';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetail';
import {useMovieGenreQuery} from '../../hooks/useMovieGenre';
import '../../common/Error/Error.style.css';
import '../../common/LoadingSpinner/LoadingSpinner.style.css';
import './MovieDetailPage.style.css';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import MovieReview from './component/MovieReview';
const MovieDetailPage = () => {

  const {id} = useParams();
  const {data:movie, isLoading, isError, error} = useMovieDetailsQuery(id);
  const {data:genreData} = useMovieGenreQuery();
  const {data:reviewData} = useMovieReviewsQuery(id);

  console.log('data',movie);
  console.log('genreData:',genreData);
  console.log('reviewData', reviewData);
  
  const showGenre = (genreIdList) => {
    if(!genreData) return []
    
    const genreNameList = genreIdList.map((obj)=>{
      const genreObj = genreData.find((genre)=>genre.id === obj.id)
      return genreObj.name
    })

    return genreNameList
  }

  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }

  return (
    <div className='movie-detail-page'>
      <div className="movie-detail-page-container">
        <div className='movie-detail-info'>
          <div className='movie-poster'>
            <img src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie?.poster_path}`} alt="" />
          </div>
          
          <div>
            <div className='movie-genre-area border-bottom'>
              {showGenre(movie.genres).map((id)=>(<div className='movie-genre'>{id}</div>))}
              {movie.adult 
                  ? <div className='movie-adult'>19+</div>
                  : <div className='movie-all'>ALL</div>
              }
            </div>

            <div className='border-bottom'>
              <h2>{movie.title}</h2>
              <h3>{movie.tagline}</h3>
              <h3>Score : {movie.vote_average.toFixed(2)}</h3>
              <h3>Popular : {movie.popularity.toFixed(2)}</h3>
            </div>

            <div className="border-bottom">
              <h3>{movie.overview}</h3>
            </div>
            
            <div className='flex'>
              <div className='flex-info'>예산</div>
              <h4>{movie.budget}</h4>
            </div>
            <div className='flex'>
              <div className='flex-info'>수익</div>
              <h4>{movie.revenue}</h4>
            </div>
            <div className='flex'>
              <div className='flex-info'>개봉일</div>
              <h4>{movie.release_date}</h4>
            </div>
            <div className='flex'>
              <div className='flex-info'>런타임</div>
              <h4>{movie.runtime}</h4>
            </div>
          </div>


        </div>

        <div>
          <h2>리뷰</h2>
          {reviewData?.results.map((review)=>(
            <MovieReview review={review}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage