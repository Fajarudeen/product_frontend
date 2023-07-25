import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';



function Header() {

  return (
    <>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faOpencart} size='xl' style={{ color: "#ffffff" }} />&nbsp;
            <span>ABCart</span>
          </Navbar.Brand>
          <Button  variant='outline-light' href='/add'>Add Product</Button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header