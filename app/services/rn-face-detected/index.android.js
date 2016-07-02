import React from 'react';
import {NativeModules} from 'react-native';

const FaceDetector = NativeModules.FaceDetector;

export default {
    detectFacesOnPicture: (fileName) => {
        return FaceDetector.detectFacesOnPicture(fileName);
    }
};
