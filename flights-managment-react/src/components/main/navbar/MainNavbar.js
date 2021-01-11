
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import swal from 'sweetalert2';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminNavbar from './AdminNavbar';
import CompanyNavbar from './CompanyNavbar';
import CustomerNavbar from './CustomerNavbar';
import AnonymousNavbar from './AnonymousNavbar';
import { userTypes } from './../../../types/userTypes'


import './../../../styles/navbar.style.css'

const onLogOut = (history, setUserType) => {
    swal.fire({
        icon: 'question',
        text: 'Are You Sure You Want To Logout?',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, Logout.',
        cancelButtonText: "No, cancel it!"
    }).then((response) => {
        if (response.isConfirmed) {
            console.log("Confirm")
            setUserType(userTypes[4])
            history.push('/home')
        }
    });
}
const MainNavbar = (props) => {
    return (
        <div className="Nav-backgroud pb-0.1">
            <Navbar collapseOnSelect expand="lg" className="navbar_inverse">
                <Navbar.Brand><Link to="/home"><div className="Main-logo-words Nav-font-color">LET'S FLY</div></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="Nav-backgroud" style={{backgroundColor:'blue'}} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">

                            <Switch>
                                <Route path={"/admin"} component={AdminNavbar}></Route>
                                <Route path={"/compnay"} component={CompanyNavbar}></Route>
                                <Route path={["/customer-profile", "/customer-tickets"]} render={() => (<CustomerNavbar onClickLogOut={() => {onLogOut(props.history, props.setUserType)}}/>)}></Route>
                                <Route path={"/"} component={AnonymousNavbar}></Route>
                            </Switch>



                        {/* <div style={{ display: props.userType === userTypes[2] ? 'flex' : 'none' }}>
                            <Link className="nav-link nav-link" to="/own-flights"><div className="Nav-font-color">Own Flights</div></Link>
                            <Link className="nav-link nav-link" to="/company-inbox"><div className="Nav-font-color">Inbox</div></Link>
                            <Link className="nav-link nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
                            <Link className="nav-link nav-link" to="/company-profile"><div className="Nav-font-color">Profile</div></Link>
                            <Link className="nav-link nav-link" to="/home"><div className="Nav-font-color">Log out</div></Link>
                        </div> */}


                        {/* <div style={{ display: props.userType === userTypes[3] ? 'flex' : 'none' }}>
                            <NavDropdown title={<div className="Nav-font-color" style={{ height: '2px' }}>Manage My Tickets</div>} id="ddown">
                                <Link className="dropdown-item Nav-font-color" to="/buy-ticket">Buy New Ticket</Link>
                                <Link className="dropdown-item Nav-font-color" to="/edit-tickets">Show/Edit/Remove</Link>
                            </NavDropdown>
                            <Link className="nav-link nav-link" to="/customer-inbox"><div className="Nav-font-color">Inbox</div></Link>
                            <Link className="nav-link nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
                            <Link className="nav-link nav-link" to="/customer-profile"><div className="Nav-font-color">Profile</div></Link>
                            <Link className="nav-link nav-link" to="/home"><div className="Nav-font-color" onClick={() => onLogOut(props.history, props.setUserType)}>Log out</div></Link>
                        </div> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default MainNavbar;