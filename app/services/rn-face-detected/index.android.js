import React from 'react';
import {NativeModules} from 'react-native';

const FaceDetector = NativeModules.RnFaceDetector;

export default {
    detectFaces: (fileName) => FaceDetector.detectFaces(fileName),
    drawRectangleOnFaces: () => FaceDetector.drawRectangleOnFaces(),
    saveResultFile: () => FaceDetector.saveResultFile()
};
