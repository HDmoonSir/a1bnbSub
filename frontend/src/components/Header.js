// import react from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
// import About from './pages/About';

const Header = () =>{
    return (
        <> 
        {/* fixed="top"  */}
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">A1BnB</Navbar.Brand>
              <Nav className="ml-auto">
                <Nav.Link href="/user/regist">당신의 공간을 A1BnB하세요!</Nav.Link>
                <Nav.Link href="/user">My Page</Nav.Link>
                <Nav.Link href="/user/login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
}

export default Header;