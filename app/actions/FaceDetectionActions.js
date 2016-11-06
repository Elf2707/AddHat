/**
 * Created by Elf on 06.11.2016.
 */
import * as ActionTypes from './../constants/FaceDetectionActionTypes'
import FaceDetector from './../services/rn-face-detected';

export function addHatsToFaces(path) {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.START_ADDING_HATS,
            payload: null,
        });

        // Detect faces
        const result = await FaceDetector.addHatsWithSaveToFile(path);

        if( result === 'Error') {
            dispatch({
                type: ActionTypes.ADDING_HATS_ERROR,
                payload: null,
            });

            return;
        }

        dispatch({
            type: ActionTypes.ADDING_HATS_SUCCESS,
            payload: result,
        });
    }
}