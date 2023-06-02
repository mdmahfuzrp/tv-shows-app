import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="danger" className='bg-danger' variant="dark">
            <Container>
                <Navbar.Brand className='fw-semibold'><Link to='/' id='hyper-link'>Tv Shows App</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to='/' className='nav-items-options'>Home</Link></Nav.Link>
                        <Nav.Link href="#pricing"><Link to='/myBookings' className='nav-items-options'>My Bookings</Link></Nav.Link>
                        <NavDropdown title="Membership" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Silver</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Platinum
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Gold</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Read More
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-1 py-1 bg-danger-subtle"
                                aria-label="Search"
                            />
                            <Button variant="btn btn-dark">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;