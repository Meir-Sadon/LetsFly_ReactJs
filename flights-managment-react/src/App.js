import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import MainNavbar from './containers/mainNavbarContainer';
import LoginForm from './components/main/LoginForm';
import CustProfile from './components/customer/CustProfile';
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

export const App = (props) => {
    initBaseAdminToken(props);
  return (
  <div className="Login-bg">
      <Router>
          <Route component={MainNavbar} />
          <Switch>
              <Route path={["/login-customer", "/login-company"]} component={LoginForm} />
              {/* Customer Pages: */}
              <Route path={["/customer-profile"]} component={CustProfile} />
          </Switch>
      </Router>
  </div>);
}

export default App