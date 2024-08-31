import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  // 홈페이지  /
  // 영화 전체 페이지 (검색) /movies
  // 영화 디테일 페이지 /movies/:id
  return (
    <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/movies'>
          <Route index element={<MoviePage/>}/>
          <Route path=':id' element={<MovieDetailPage/>}/>
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
