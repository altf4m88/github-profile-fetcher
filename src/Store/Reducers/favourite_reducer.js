import {GET_FAVOURITES, ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITES} from '../Actions';

const initState = {
    favouriteData: []
}

function Favourite(state = initState, action){
    switch(action.type){
        case GET_FAVOURITES:
            let FavouriteData = JSON.parse(localStorage.getItem('fav'));
            if(FavouriteData) state.favouriteData = FavouriteData;
            return state;
        case ADD_TO_FAVOURITES:
            let isHere = false;
            let payload = action.payload;
            for(let index = 0; index < state.favouriteData.length; index++){
                const element = state.favouriteData[index];
                if(element === payload){
                    isHere = true;
                }
            }
            if(!isHere){
                let localState = state.favouriteData;
                localState.push(action.payload);
                state.favouriteData = localState;
                localStorage.setItem('Fav', JSON.stringify(localState))
            } else {
                console.log("this item already exists");
            }
        case DELETE_FROM_FAVOURITES:
            let deleteValue = action.payload;
            let arr = state.favouriteData;
            arr = arr.filter(item => item !== deleteValue);

            state.favouriteData = arr;
            localStorage.setItem('Fav', JSON.stringify(arr));
            return state;
        default:
            return state;
    }
}

export default Favourite;

