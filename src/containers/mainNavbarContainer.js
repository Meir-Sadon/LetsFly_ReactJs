import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

import MainNavbar from './../components/main/navbar/MainNavbar'

import { setUserType, setUserToken, setCustomer } from '../redux/actions/identity.actions';
import { setUserMessages } from '../redux/actions/data.actions';
import { userTypes } from './../types/userTypes'

function whenConfirmLogOut(props) {
    return swal.fire({
        icon: 'question',
        text: 'Are You Sure You Want To Logout?',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, logout.',
        cancelButtonText: "No, stay logon!!"
    })
    // }).then((response) => {
    //     if (response.isConfirmed) {
    //         props.setUserType(userTypes[4]);
    //         props.setUserToken('');
    //         props.setUserMessages([]);
    //         props.history.push('/home')
    //     }
    // });
}

async function getAllUserMessages(userId, adminToken, setUserMessages){
    let curUrl = "https://localhost:951/api/administrators/messages/" + userId
    const res = await axios.get(curUrl, {
        headers: {
            //'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': "*",
            'Authorization': `Bearer ${adminToken}`
        }
    })
    setUserMessages(res.data)
}

const MainNavbarCon = connect(
    (state) => (
        {
        userType: state.identity.userType,
    }),
    {
        setUserType,
        setUserToken,
        setCustomer,
        whenConfirmLogOut,
        getAllUserMessages,
        setUserMessages, 
    }
)(MainNavbar);

export default MainNavbarCon