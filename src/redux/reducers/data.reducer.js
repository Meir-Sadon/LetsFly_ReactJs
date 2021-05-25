import { SET_USER_MESSAGES } from "../events/data.events";

const initState = {
    userMessages: []
}

export default function dataReducer(state = initState, action) {
    switch (action.type) {
        case SET_USER_MESSAGES:
            return { ...state, userMessages: action.payload };
        default:
            return state;
    }
};