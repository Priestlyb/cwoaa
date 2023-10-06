import React from 'react'
import "./footer.css"
import logo from "./logo.svg"

function Footer() {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-section about">
      <img className="logo" src={logo} alt='logo' width="75px"/>
      <h2>Our Motto:</h2>
      <p>
      The motto of the CWOAA follows that of CWON: <br />
      <strong>Love, Light, Unity and Peace.</strong>
      </p>
      <div className="socials">
        <a href="https://web.facebook.com/cwonigeria" target='blank'><i className="facebook fab fa-facebook"></i></a>
        <a href="/" target='blank'><i className="instagram fab fa-instagram"></i></a>
      </div>
    </div>
    <div className="footer-section links">
      <h2>Quick Links</h2>
      <ul className='mt-4'>
        <li><a href="/news">News</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/prayers">Prayers</a></li>
        <li><a href="/events">Events</a></li>
      </ul>
    </div>
    <div className="footer-section contact-form">
      <h2>Contact Us</h2>
      <a className="btn email_btn" href="mailto:cwoaamedia@gmail.com" data-aos="flip-up"
    data-aos-easing="ease-in-out-quart">Email ME</a>
    </div>
  </div>

  <div className="container footer-bottom">
    <div className='row p-2'>
    <span className='col-lg-6'>&copy; 2023 CWOAA. All rights reserved.</span>
    <a href='/admin' className='col-lg-6 text-right text-light'>Admin</a>
    </div>
  </div>
</footer>

  )
}

export default Footer