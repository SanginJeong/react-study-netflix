import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './AppLayout.style.css';
import { useState } from 'react';
const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
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

          <form action="">
            <input type="text" placeholder='Search'/>
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