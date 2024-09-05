import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './AppLayout.style.css';
import { useState } from 'react';
const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchByKeyword = (e) => {
    e.preventDefault();

    // url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  }
  return (
    <>
      <nav>
        <div className='nav_logo'>
          <img src="https://noona-netflix-react-query.vercel.app/netflixLogoSvg.svg" alt="" />
        </div>
      
        <div className={`nav_menu ${isOpen ? 'active': ''}`}>
          <div className='nav_menu_links'>
            <Link to='/'><h4>Home</h4></Link>
            <Link to='/movies'><h4>Movies</h4></Link>
          </div>

          <form onSubmit={searchByKeyword}>
            <input 
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='Search'/>
            <button type='submit'>Search</button>
          </form>
        </div>

        <button
          onClick={()=>{setIsOpen(!isOpen)}} 
          className='hamburger'>
            <i class="fa-solid fa-bars"></i>
        </button>
      </nav>

      <Outlet/>
    </>
  )
}

export default AppLayout