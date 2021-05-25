import { SET_USER_TYPE, SET_REG_IDENTITY, SET_CUSTOMER,
     SET_COMPANY, SET_USER_TOKEN, INIT_ADMIN_TOKEN , SET_USER_MESSAGES} from "../events/identity.events";

export function setUserType(userType) {
    return {
        type: SET_USER_TYPE,
        payload: userType
    };
};

export function setCustomer (customer) {
    return {
        type: SET_CUSTOMER,
        payload: customer
    };
};

export function setCompany (company) {
    return {
        type: SET_COMPANY,
        payload: company
    };
};

export function setRegIdentity (idenType) {
    return {
        type: SET_REG_IDENTITY,
        payload: idenType
    };
};

export function initAdminToken (newAdminToken) {
    return {
        type: INIT_ADMIN_TOKEN,
        payload: newAdminToken
    };
}
export function setUserToken (newToken) {
    return {
        type: SET_USER_TOKEN,
        payload: newToken
    };
};

export function setUserMessages (messages) {
    return {
        type: SET_USER_MESSAGES,
        payload: messages
    };
};