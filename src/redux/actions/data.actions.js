import {SET_USER_MESSAGES} from './../events/data.events'

export function setUserMessages (messages) {
    return {
        type: SET_USER_MESSAGES,
        payload: messages
    };
}
