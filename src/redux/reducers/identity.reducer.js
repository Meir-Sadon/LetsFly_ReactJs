
import { SET_USER_TYPE, SET_REG_IDENTITY, SET_CUSTOMER, SET_USER_TOKEN, INIT_ADMIN_TOKEN , SET_USER_MESSAGES } from "../events/identity.events";
import { userTypes } from './../../types/userTypes'
// import {Customer} from './../../model/Customer';
import {User} from './../../model/User';

const initState = {
    curAdmin: {},
    adminToken: '',
    curUser: new User(),
    userToken: '',
    userType: userTypes[4],
    identity: '',
}

export default function identityReducer(state = initState, action) {
    switch (action.type) {
        case SET_USER_TYPE:
            return { ...state, userType: action.payload };
        case SET_CUSTOMER:
            return { ...state, curCustomer: action.payload };
        case SET_REG_IDENTITY:
            return { ...state, identity: action.payload };
        case INIT_ADMIN_TOKEN:
            return { ...state, adminToken: action.payload}
        case SET_USER_TOKEN:
            return {...state, userToken: action.payload };
        default:
            return state;
    }
};