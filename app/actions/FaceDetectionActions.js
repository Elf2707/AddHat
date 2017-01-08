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
    Actions.photoPreview({ type: ActionConst.POP_AND_REPLACE });

    try {
      console.log('dddddddddd');

      // Detect faces
      const result = await FaceDetector.addHats(path);

      if (result === 'Error') {
        console.log('dddddddddd111');

        throw new Error('Error detection Faces!');
      }
      console.log(result);

      // Get image size
      Image.getSize(result, (data) => {
        console.log('ssssssssssssssssssssssssssssssssss');
        console.log(data);
        dispatch({
          type: ActionTypes.ADDING_HATS_SUCCESS,
          payload: result,
        });
      }, err => console.log(err));
    } catch (e) {
      console.log(e.message);

      dispatch({
        type: ActionTypes.ADDING_HATS_ERROR,
        payload: null,
      });
      Actions.camera();
      return;
    }

  }
}