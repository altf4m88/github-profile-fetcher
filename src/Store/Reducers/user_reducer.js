import {REGISTER_USER_STATE} from '../Actions';

const initialState = {isAuthenticated: Boolean};

const Users = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_USER_STATE:
            state.isAuthenticated = action.payload;
            return state;
        default:
            return state;
    }
}

export default Users;