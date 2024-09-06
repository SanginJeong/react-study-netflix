import React, { useState } from 'react'
import {useParams} from 'react-router-dom';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetail';
import {useMovieGenreQuery} from '../../hooks/useMovieGenre';
import '../../common/Error/Error.style.css';
import '../../common/LoadingSpinner/LoadingSpinner.style.css';
import './MovieDetailPage.style.css';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import MovieReview from './component/MovieReview';
import { useRelatedMoviesQuery } from '../../hooks/useRelatedMovie';
import MovieCard from '../../common/MovieCard/MovieCard'
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import { useMovieVideoQuery } from '../../hooks/useMovieVideo';

Modal.setAppElement('#root');

const MovieDetailPage = () => {
  const [isReviewOrRelated, setIsReviewOrRelated] = useState('리뷰');
  const [modalIsOpen, setModalIsOpen] = useState(false);  
  const userInfoObj = [
    {
      type : 'budget',
      content : '예산',
    },
    {
      type : 'revenue',
      content : '수익',
    },
    {
      type : 'release_date',
      content : '개봉일',
    },
    {
      type : 'runtime',
      content : '상영시간',
    },
  ]

  const {id} = useParams();
  const {data:movie, isLoading, isError, error} = useMovieDetailsQuery(id);
  const {data:genreData} = useMovieGenreQuery();
  const {data:reviewData} = useMovieReviewsQuery(id);
  const {data:relatedMovie} = useRelatedMoviesQuery(id);
  const {data:videoMovie} = useMovieVideoQuery(id);

  console.log('data',movie);
  console.log('genreData:',genreData);
  console.log('reviewData', reviewData);
  console.log('relatedMovie', relatedMovie);
  console.log('videoMovie', videoMovie);
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const videoOptions = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

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
        <div className='movie-detail-info border-bottom'>
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
            
            {
              userInfoObj.map((userInfo)=>(
              <div className='movie-detail'>
                <div className='movie-detail-userInfo'>{userInfo.content}</div>
                <h4>{movie[userInfo.type]}</h4>
              </div>
              ))
            }
            <div>
              <button onClick={openModal}>예고편 보기</button>
            </div>
          </div>


        </div>

        <div className='movie-detail-bottom'>
          <div className='movie-detail-button-area'>
            <button 
              className={`${isReviewOrRelated === '리뷰' ? 'selected-button' : '' }`}
              onClick={()=>{setIsReviewOrRelated('리뷰')}}>리뷰</button>
            <button 
              className={`${isReviewOrRelated === '관련영화' ? 'selected-button' : '' }`}
              onClick={()=>{setIsReviewOrRelated('관련영화')}}>관련영화</button>
          </div>

          {isReviewOrRelated === '리뷰'
            ? reviewData?.results.map((review)=>(
              <MovieReview review={review}/>))
            : 
            <div className='related-area'>
              {relatedMovie?.results.map((movie)=>(
                <MovieCard movie={movie}/>
              ))}
            </div> 
          }
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="YouTube Trailer"
        style={{
          content: {
            backgroundColor: '#000',
            color: '#fff',
            maxWidth: '700px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <button onClick={closeModal} style={{ color: 'white', marginBottom: '20px' }}>Close</button>
        <YouTube videoId={videoMovie?.results[0].key} opts={videoOptions} />
      </Modal>
    </div>
  )
}

export default MovieDetailPage