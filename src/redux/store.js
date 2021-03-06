import { createStore , applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import allReducers from "./reducers/reducersCombiner";

export default createStore(
    allReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)