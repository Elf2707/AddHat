/**
 * Created by Elf on 06.11.2016.
 */
import CameraRoll from 'rn-camera-roll';

import * as ActionTypes from './../constants/PhotoListActionTypes';
import PropsConfig from './../config/PropsConfig';

export function fetchPhotos(lastFetchedPhoto) {
    return (dispatch) => {
        onPhotosFetchedSuccess = (data) => {
            const newPhotos = data.edges.map((asset) => {
                console.log(asset);
                return asset.node.image;
            });

            dispatch({
                type: ActionTypes.PHOTOS_FETCHED_SUCCESS,
                payload: newPhotos,
            });
        };

        onPhotosFetchError = (err) => {
            // Handle error here
            console.log(err);

            dispatch({
                type: ActionTypes.PHOTOS_FETCHED_ERROR,
                payload: null,
            });
        };

        // Start fetched photos
        dispatch({
            type: ActionTypes.TRY_FETCH_PHOTOS,
            payload: null,
        });

        CameraRoll.getPhotos({
            first: PropsConfig.photosPerPage,
            after: lastFetchedPhoto,
        }, onPhotosFetchedSuccess, onPhotosFetchError);
    }
}
