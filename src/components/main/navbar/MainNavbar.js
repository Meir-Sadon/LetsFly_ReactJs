
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import swal from 'sweetalert2';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminNavbar from './AdminNavbar';
import CompanyNavbar from './CompanyNavbar';
import CustomerNavbar from './CustomerNavbar';
import AnonymousNavbar from './AnonymousNavbar';
import { userTypes } from './../../../types/userTypes';
import './../../../styles/navbar.style.css'

async function onLogOut(props){
    const res = await props.whenConfirmLogOut(props)
    // const res = await swal.fire({
    //     icon: 'question',
    //     text: 'Are You Sure You Want To Logout?',
    //     showCancelButton: true,
    //     confirmButtonColor: '#DD6B55',
    //     confirmButtonText: 'Yes, logout.',
    //     cancelButtonText: "No, stay logon!"
    // });
    console.log(res)
    if(res.isConfirmed){
        props.setUserType(userTypes[4]);
        props.setCustomer({});
        props.setUserToken('');
        props.setUserMessages([]);
        props.history.push('/home')
    }
    // }).then((response) => {
    //     if (response.isConfirmed) {
    //         props.setUserType(userTypes[4]);
    //         props.setCustomer({});
    //         props.setUserToken('');
    //         props.setUserMessages([]);
    //         props.history.push('/home')
    //     }
    // });
}

const UserNavbar = (props) => {
    switch(props.userType){
        case userTypes[1]:
            return <AdminNavbar onClickLogOut={() => onLogOut}></AdminNavbar>
        case userTypes[2]:
            return <CompanyNavbar onClickLogOut={() => onLogOut}></CompanyNavbar>
        case userTypes[3]:
            return <CustomerNavbar onClickLogOut={() => onLogOut(props)}></CustomerNavbar>
        default:
            return <AnonymousNavbar></AnonymousNavbar>
        }  
}

const MainNavbar = (props) => {
    const userNavbar = UserNavbar(props)
        return (
        <div className="Nav-backgroud pb-0.1">
            <Navbar collapseOnSelect expand="lg" className="navbar_inverse">
                <Navbar.Brand>
                    <Link to="/home">
                        <div className="Main-logo-words Nav-font-color">LET'S FLY</div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="Nav-backgroud" style={{backgroundColor:'blue'}} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {userNavbar}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default MainNavbar;