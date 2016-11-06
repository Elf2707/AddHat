/**
 * Created by Elf on 06.06.2016.
 */
import * as ActionTypes from '../constants/FaceDetectionActionTypes';

const initialState = {
    isPhotoProcessing: false,
    photoWithHatsFileName: '',
};

export default function faceDetector(state = initialState, action = {}) {
    switch (action.type){
        case ActionTypes.START_ADDING_HATS:
            return Object.assign({}, state, {
                isPhotoProcessing: true,
            });

        case ActionTypes.ADDING_HATS_ERROR:
            return Object.assign({}, state, {
                isPhotoProcessing: false,
            });

        case ActionTypes.ADDING_HATS_SUCCESS:
            return Object.assign({}, state, {
                isPhotoProcessing: false,
                photoWithHatsFileName: action.payload,
            });

        default:
            return state;
    }
}