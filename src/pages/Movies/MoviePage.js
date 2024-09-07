import React, {useEffect, useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom';
import '../../common/Error/Error.style.css';
import '../../common/LoadingSpinner/LoadingSpinner.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MoviePage = () => {
  const [page,setPage]= useState(1);
  const [selectedSort, setSelectedSort] = useState('high');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortedList, setSortedList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword,page,genre:selectedGenre});
  const {data:genreData} = useMovieGenreQuery();

  
  const handlePageClick = ({selected}) => {
    setPage(selected+1);
  }

  const handleGenre = (e) => {
    setSelectedGenre(e.target.value);
  }

  const handleSort = (e) => {
    setSelectedSort(e.target.value);
  }
  
  useEffect(()=>{
    setPage(1);
  },[keyword])
  
  useEffect(() => {
    const sortData = () => {
      if (!data || !data.results) return [];

      let dataList = [...data.results];

      if (selectedSort === 'high-p') {
        return dataList.sort((a, b) => b.popularity - a.popularity);
      }
      if (selectedSort === 'low-p') {
        return dataList.sort((a, b) => a.popularity - b.popularity);
      }
      if (selectedSort === 'high-s') {
        return dataList.sort((a, b) => b.vote_average - a.vote_average)
      }
      if (selectedSort === 'low-s') {
        return dataList.sort((a, b) => a.vote_average - b.vote_average)
      }

      return dataList;
    };

    setSortedList(sortData());
    console.log('sortedList',sortedList);
  }, [data, selectedSort]);

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
              <select value={selectedGenre} onChange={handleGenre}>
                <option value="">카테고리</option>
                {genreData?.map((genre)=>(
                  <option value={genre.id}>{genre.name}</option>
                ))}
              </select>
              <select value={selectedSort} onChange={handleSort}>
                <option value="high-p">High Popularity</option>
                <option value="low-p">Low Popularity</option>
                <option value="high-s">High Score</option>
                <option value="low-s">Low Score</option>
              </select>
            </div>

            <div className='movie-card-area'>
              <div className="row">
              {sortedList?.map((movie,index)=>(
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