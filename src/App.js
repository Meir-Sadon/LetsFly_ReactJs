import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
//import PageNotFound from './components/main/404';
import MainNavbar from './containers/mainNavbarContainer';
import LoginForm from './components/main/LoginForm';
import CustProfile from './components/customer/CustProfile';
import CustTickets from './components/customer/CustTickets';
import CustInbox from './components/customer/CustInbox';
import {userTypes} from './types/userTypes';

function initBaseAdminToken(props) {
        axios.post("https://localhost:951/api/Auth", {
        UserName: "ADMIN",
        Password: "9999",
        Type: userTypes[1],
        headers: { "Access-Control-Allow-Origin": "*" }
    }).then((res) => {
        props.initAdminToken(res.data)
    })
}

export class App extends React.Component{
    constructor(props){
        super(props)
        initBaseAdminToken(props);
    }
  render () {
  return <div className="Login-bg">
      <Router>
          <Route component={MainNavbar} />
          <Switch>
              {/* <Route path={"/404"} component={} /> */}
              <Route path={["/login-customer", "/login-company"]} component={LoginForm} />
              {/* Customer Pages: */}
              <Route path={["/customer-profile"]} component={CustProfile} />
              <Route path={["/customer-tickets"]} component={CustTickets} />
              <Route path={["/customer-inbox"]} component={CustInbox} />
          </Switch>
      </Router>
  </div>
  };
}

export default App