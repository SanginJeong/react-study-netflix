import React, {useEffect, useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom';
import '../../common/Error/Error.style.css';
import '../../common/LoadingSpinner/LoadingSpinner.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css';
import ReactPaginate from 'react-paginate';
import {Col, Container, Row} from 'react-bootstrap';

// 경로 2가지
// nav바에서 클릭해서 온경우: popular movie
// keyword를 입력해서 온경우: keyword와 관련된 영화를 보여줌
const MoviePage = () => {
  const  [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page,setPage]= useState(1);
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword,page});
  console.log(data);
  
  const handlePageClick = ({selected}) => {
    setPage(selected+1);
    
  }
  
  useEffect(()=>{
    setPage(1);
  },[keyword])
  
  if (isLoading) {
    return <div className="spinner"></div>
  }

  if (isError) {
    return <div className="error-message"><p>{error.message}</p></div>
  }

  return (
      <div className="wrap">
        {data.results.length === 0 
          ? 
          <div className='no-results'>
            <h1>No Results</h1>
          </div>
          : 
          <div className="movie-page">
            <div className="custom-select">
            <select>
              <option value="0">필터</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>

          <div className='movie-card-area'>
            <div className="row">
            { data.results.map((movie,index)=>(
              <MovieCard movie = {movie}/>
                ))}
            </div>
          </div>
        </div>
        }
        
        <ReactPaginate
          nextLabel="→"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.total_pages}
          previousLabel="←"
          pageClassName="custom-page-item"
          pageLinkClassName="custom-page-link"
          previousClassName="custom-prev-item"
          previousLinkClassName="custom-prev-link"
          nextClassName="custom-next-item"
          nextLinkClassName="custom-next-link"
          breakLabel="..."
          breakClassName="custom-break-item"
          breakLinkClassName="custom-break-link"
          containerClassName="custom-pagination"
          activeClassName="custom-active"
          renderOnZeroPageCount={null}
          forcePage={page -1}
        />

      </div>
  )
}

export default MoviePage