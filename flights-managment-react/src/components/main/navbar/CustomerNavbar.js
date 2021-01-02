import React from 'react';
import {Link} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function CustomerNavbar(props) {
    console.log(props)
    return (
        //<div style={{ display: props.userType === userTypes[3] ? 'flex' : 'none' }}>
        <div style={{ display: 'flex' }}>
            <NavDropdown title={<div className="Nav-font-color" style={{ height: '2px' }}>Manage My Tickets</div>} id="ddown">
                <Link className="dropdown-item Nav-font-color" to="/buy-ticket">Buy New Ticket</Link>
                <Link className="dropdown-item Nav-font-color" to="/edit-tickets">Show/Edit/Remove</Link>
            </NavDropdown>
            <Link className="nav-link nav-link" to="/customer-inbox"><div className="Nav-font-color">Inbox</div></Link>
            <Link className="nav-link nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
            <Link className="nav-link nav-link" to="/customer-profile"><div className="Nav-font-color">Profile</div></Link>
            <Link className="nav-link nav-link" to="/home"><div className="Nav-font-color" onClick={props.onClickLogOut}>Log out</div></Link>
        </div>
    );
}

export default CustomerNavbar;