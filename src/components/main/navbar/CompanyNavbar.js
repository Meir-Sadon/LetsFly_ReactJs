import React from 'react';
import {Link} from 'react-router-dom';

function CompanyNavbar(props) {

    return (
        <div className="Sub-Dropdown-Main">
            <Link className="nav-link nav-link" to="/own-flights"><div className="Nav-font-color">Own Flights</div></Link>
            <Link className="nav-link nav-link" to="/company-inbox"><div className="Nav-font-color">Inbox</div></Link>
            <Link className="nav-link nav-link" to="/search-flights"><div className="Nav-font-color">Search Flights</div></Link>
            <Link className="nav-link nav-link" to="/company-profile"><div className="Nav-font-color">Profile</div></Link>
            <Link className="nav-link nav-link" to="/home"><div className="Nav-font-color">Log out</div></Link>
        </div>

    );
}

export default CompanyNavbar;