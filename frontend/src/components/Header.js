// import react from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
import { useAppContext } from "../store";

const Header = () =>{
  const {
    store: { isAuthenticated },
  } = useAppContext();

    return (
        <> 
        {/* fixed="top"  */}
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">A1BnB</Navbar.Brand>
              <Nav className="ml-auto">
                <Nav.Link href="/user/regist">당신의 공간을 A1BnB하세요!</Nav.Link>
                <Nav.Link href="/user">My Page</Nav.Link>
                {isAuthenticated ? (
                  <Nav.Link href="/user/logout">Logout</Nav.Link>):( 
                  <Nav.Link href="/user/login">Login</Nav.Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </>
      );
}

export default Header;