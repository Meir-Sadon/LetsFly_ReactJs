import React from 'react';
import {Link} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function CustomerNavbar(props) {
    return (
        //<div style={{ display: props.userType === userTypes[3] ? 'flex' : 'none' }}>
        <div style={{ display: 'flex' }}>
            <Link className="nav-link" to="/customer-tickets"><div className="Nav-font-color">Manage Your Tickets</div></Link>
            <Link className="nav-link" to="/customer-inbox"><div className="Nav-font-color">Inbox</div></Link>
            <Link className="nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
            <Link className="nav-link" to="/customer-profile"><div className="Nav-font-color">Profile</div></Link>
            <Link className="nav-link" to="/customer-profile"><div className="Nav-font-color" onClick={props.onClickLogOut}>Log out</div></Link>
        </div>
    );
}

export default CustomerNavbar;