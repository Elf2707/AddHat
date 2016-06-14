/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

const initialState = {
    urlList:[]
};

export default function previewReducer(state = initialState, action = {}) {
    switch (action.type){
        case types.ADD_URL_TO_MAKE_PREVIEW:
            return Object.assign({}, state, {
                urlList: [
                    ...state.urlList, action.url
                ]
            });

        default:
            return state;
    }
}