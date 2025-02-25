import { faFacebook, faInstagram, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
function Footer() {
  return (
    <>
         <footer className="footer bg-light text-dark p-3 ">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h2 className="text-warning">About</h2>
            <p>
            Reading books may have several physical and mental benefits. These include strengthening your brain, increasing your ability to empathize, reducing stress, and building your vocabulary, among others.
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-md-2 mb-4 text-center">
            <h3 className="text-warning">Quick Links</h3>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-dark text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="/login" className="text-dark text-decoration-none">Login</a></li>
              <li className="mb-2"><a href="#contact" className="text-dark text-decoration-none">Contact</a></li>
              <li className="mb-2"><a href="/register" className="text-dark text-decoration-none">Membership</a></li>
            </ul>
          </div>
          {/* Services */}
          <div className="col-md-3 mb-4 text-center">
            <h3 className="text-warning">Services</h3>
            <ul className="list-unstyled">
              <li className="mb-2">Borrow</li>
              <li className="mb-2">Read</li>
              <li className="mb-2"></li>
            </ul>
          </div>
          {/* Stay Connected */}
          <div className="col-md-3 text-center">
            <h2 className="text-warning">Stay Connected</h2>
            <div className="social-icons d-flex justify-content-center mt-3">
              <a href="#" className="text-dark mx-2" title="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              </a>
              <a href="#" className="text-dark mx-2" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" className="text-dark mx-2" title="YouTube">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a href="#" className="text-dark mx-2" title="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" className="text-dark mx-2" title="Twitter">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </div>
          <div className='text-center' >
            <p style={{fontSize:'10px'}}>©COPYRIGHT 2024,ALL RIGHT RESERVED| LIBRARY-MANAGEMENT</p>
          </div>
        </div>
        
      </div>
    </footer>
    </>
  )
}
export default Footer