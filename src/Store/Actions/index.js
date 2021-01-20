export const GET_FAVOURITES = 'GET_FAVOURITES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const DELETE_FROM_FAVOURITES = 'DELETE_FROM_FAVOURITES';


export function getFavouriteState(){
    const action = {
        type: GET_FAVOURITES
    }
    return action;
}

export function addToFavourites(item){
    const action = {
        type: ADD_TO_FAVOURITES,
        payload: item
    }
    return action;
}

export function deleteFromFavourites(item){
    const action = {
        type: DELETE_FROM_FAVOURITES,
        payload: item
    }

    return action;
}