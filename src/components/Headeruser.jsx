import React, { useEffect } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function Headeruser() {
    const username =localStorage.getItem('username')

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      navigate('/'); // Redirect to home page
    };
    
    

    return (
        <>
            <Navbar bg="light" expand="lg" className="shadow-sm mb-5">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="#home" className="d-flex align-items-center">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/018/250/052/small_2x/library-education-3d-icon-png.png" 
                            alt="Library Logo"
                            style={{ height: '60px', marginRight: '15px' }}
                        />
                        <span className="h1 mb-0">E-Library</span>
                    </Navbar.Brand>
                   {!username ? <div className='d-flex justify-content-center align-items-center'>
                    <Link to={'/login'}><Button variant="primary" className="me-3">Login</Button></Link>
                       <Link to={'/register'}> <Button variant="secondary" className='ms-3'>Membership</Button></Link>
                    </div>
                    :
                    <div>
                        <Button onClick={handleLogout} variant="warning" className="me-2">Logout</Button>
                    </div>}
                </Container>
            </Navbar>
        </>
    )
}

export default Headeruser