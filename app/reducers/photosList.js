/**
 * Created by Elf on 06.06.2016.
 */
import * as ActionTypes from '../constants/PhotoListActionTypes';

const initialState = {
    photos: [],
    isPhotosPending: false,
    lastFetchedPhoto: '',
};

export default function photosList(state = initialState, action = {}) {
    switch (action.type) {
        case ActionTypes.TRY_FETCH_PHOTOS:
            return Object.assign({}, state, {
                photos: [],
                isPhotosPending: true,
            });

        case ActionTypes.PHOTOS_FETCHED_SUCCESS:
            return Object.assign({}, state, {
                photos: action.payload,
                lastFetchedPhoto: action.payload.length === 0 ?
                    '' : action.payload[action.payload.length - 1],
                isPhotosPending: false,
            });

        case ActionTypes.PHOTOS_FETCHED_ERROR:
            return Object.assign({}, state, {
                isPhotosPending: false,
            });

        default:
            return state;
    }
}