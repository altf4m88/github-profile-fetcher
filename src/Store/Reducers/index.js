import {combineReducers} from 'redux';

import Favourite from './favourite_reducer';
import Users from './user_reducer';

const rootReducer = combineReducers({
    Favourite,
    Users
})


export default rootReducer;