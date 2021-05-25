import {combineReducers} from 'redux';
import identityReducer from './identity.reducer'
import dataReducer from './data.reducer'

export default combineReducers({
    identity: identityReducer,
    data: dataReducer
});


