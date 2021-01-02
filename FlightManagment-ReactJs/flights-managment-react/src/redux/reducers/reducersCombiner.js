import {combineReducers} from 'redux';
import identityReducer from './identity.reducer'

export default combineReducers({
    identity: identityReducer
});


