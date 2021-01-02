import { connect } from 'react-redux';

import MainNavbar from './../components/main/navbar/MainNavbar'
import { setUserType } from '../redux/actions/identity.actions';

const MainNavbarCon = connect(
    (state) => (
        {
        userType: state.identity.userType,
    }),
    {
        setUserType
    }
)(MainNavbar);

export default MainNavbarCon