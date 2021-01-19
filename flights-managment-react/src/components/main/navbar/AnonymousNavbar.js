import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function AnonymousNavbar() {

    return (
        //<div style={{ display: props.userType === userTypes[4] ? 'flex' : 'none' }}>
        <div className="Sub-Dropdown-Main">
            <NavDropdown title={<div className="Nav-font-color" style={{ height: '2px' }}>Sing-Up</div>} id="ddown">
                <Link className="dropdown-item Nav-font-color" to="/page/customerregister">As Customer</Link>
                <Link className="dropdown-item Nav-font-color" to="/page/companyregister">As Company</Link>
            </NavDropdown>
            <NavDropdown title={<div className="Nav-font-color" style={{ height: '2px' }}>Sing-In</div>} id="ddown">
                <Link className="dropdown-item Nav-font-color" to="/login-customer">As Customer</Link>
                <Link className="dropdown-item Nav-font-color" to="/login-company">As Company</Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item Nav-font-color" to="/login-adminlogin">As Administrator</Link>
            </NavDropdown>
            <Link className="nav-link nav-link" to="/page/searchflight"><div className="Nav-font-color">Search Flights</div></Link>
        </div>
    );
}

export default AnonymousNavbar;