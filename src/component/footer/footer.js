import React from 'react'
import "./footer.css"
import logo from "./logo.png"

function Footer() {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-section about">
      <img className="logo" src={logo} alt='logo' width="75px"/>
      <h2>Our Mission and Vision</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec est
        quis justo pretium fermentum. Aliquam erat volutpat. Sed eu nulla quis
        nibh tincidunt ullamcorper.
      </p>
      <div className="socials">
        <a href="https://web.facebook.com/cwonigeria" target='blank'><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
    <div className="footer-section links">
      <h2>Quick Links</h2>
      <ul>
        <li><a href="/news">News</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/prayer">Prayer</a></li>
        <li><a href="/events">Events</a></li>
      </ul>
    </div>
    <div className="footer-section contact-form">
      <h2>Contact Us</h2>
      <form>
        <input type="email" name="email" placeholder="Enter your email address" />
        <textarea name="message" placeholder="Enter your message"></textarea>
        <button className="cta Go_back_icon">
                <span className="hover-underline-animation"><a href='/#portfolios'>
                  Send
                </a> </span>
              </button>
      </form>
    </div>
  </div>
  <div className="container footer-bottom">
    <p>&copy; 2023 CWOAA. All rights reserved.</p>
  </div>
</footer>

  )
}

export default Footer