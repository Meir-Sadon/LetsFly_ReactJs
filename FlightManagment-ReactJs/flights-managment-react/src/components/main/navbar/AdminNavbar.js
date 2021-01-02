import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


function AdminNavbar() {
    return (
        //<div className="Nav-font-color" style={{ display: props.userType === userTypes[1] ? 'flex' : 'none' }}>
        <div className="Nav-font-color" style={{ display: 'flex' }}>
            <NavDropdown title="Management" id="collasible-nav-dropdown">
                <Link className="dropdown-item Nav-font-color" to="/edit-companies">Edit Airlines</Link>
                <Link className="dropdown-item Nav-font-color" to="/edit-customers">Edit Customers</Link>
            </NavDropdown>
            <Link className="nav-link nav-link" to="/admin-inbox"><div className="Nav-font-color">Inbox</div></Link>
            <Link className="nav-link nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
            <Link className="nav-link nav-link" to="/admin-profile"><div className="Nav-font-color">Profile</div></Link>
            <Link className="nav-link nav-link" to="/home"><div className="Nav-font-color" >Log out</div></Link>
        </div>
    );
}

export default AdminNavbar