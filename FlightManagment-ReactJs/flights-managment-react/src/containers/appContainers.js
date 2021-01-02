import { connect } from 'react-redux';
//import axios from 'axios';

import { App as Component } from './../App'
import { setUserType, setRegIdentity, initAdminToken } from '../redux/actions/identity.actions';
//import {userTypes} from './../types/userTypes'

const App = connect(
    (state) => (
        {
        newCustomer: state.identity.curCustomer,
        newCompany: state.identity.curCompany,
        newAdmin: state.identity.curAdmin,
        userType: state.identity.userType,
        identity: state.identity.identity
    }),
    {
        setUserType, setRegIdentity, initAdminToken
    }
)(Component);

export default App