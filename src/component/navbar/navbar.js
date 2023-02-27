import React from 'react';
import './navbar.css';
import logo from "./ProudNigerianWoman.png"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id='navbar'>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">CWOAA <img src={logo} alt='logo' width="40px" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/prayer">Prayers</a>
            </li>
            <li className="nav-item active dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Activities
          </a>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a className="dropdown-item" href="/news">News</a></li>
            <li><a className="dropdown-item" href="/events">Events</a></li>
          </ul>
        </li>
            <li className="nav-item active">
              <div className="nav_icon nav-link active">
                <a href='https://www.tiktok.com/@huntamazonfinds' target='blank' className='tiktok_icon'><i className="fab fa-facebook"></i></a>  <a href='https://www.instagram.com/huntamazonfinds/' target='blank' className='instagram_icon'><i className="fab fa-instagram"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
