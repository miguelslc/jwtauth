//If any errors occur then this reducer fill the state with errors 
//and we can display that errors from the frontend.

import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}