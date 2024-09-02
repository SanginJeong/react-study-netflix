import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/MovieSlide/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/MovieSlide/TopRatedMovieSlide/TopRatedMovieSlide'
import UpComingMovieSlide from './components/MovieSlide/UpComingMovieSlide/UpComingMovieSlide'

// 배너 : popluar movie 의 첫번째 영화 보여주기
// popular movie
// top ranked movie
// upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
      <TopRatedMovieSlide/>
      <UpComingMovieSlide/>
    </div>
  )
}

export default Homepage