/**
 * Created by Elf on 06.11.2016.
 */
import { Image } from 'react-native';
import { Actions,  ActionConst } from 'react-native-router-flux';

import * as ActionTypes from './../constants/FaceDetectionActionTypes'
import FaceDetector from './../services/rn-face-detected';
import DimensionUtils from '../utils/dimensionUtils';

export function addHatsToFaces(path) {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.START_ADDING_HATS,
      payload: null,
    });

    Actions.photoPreview();

    try {
      // Detect faces
      const result = await FaceDetector.addHats(path);

      if (result === 'Error') {
        throw new Error('Error detection Faces!');
      }

      // Get image size
      Image.getSize(result, (width, height) => {
        dispatch({
          type: ActionTypes.ADDING_HATS_SUCCESS,
          payload: {
            height,
            width,
            path,
          },
        });
      }, (err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.ADDING_HATS_ERROR,
          payload: null,
        });
      });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: ActionTypes.ADDING_HATS_ERROR,
        payload: null,
      });
    }
  }
}