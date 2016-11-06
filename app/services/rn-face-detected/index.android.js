import React from 'react';
import { NativeModules } from 'react-native';

const FaceDetector = NativeModules.RnFaceDetector;

export default {
    addHatsWithSaveToFile: (fileName) => FaceDetector.addHatsWithSaveToFile(fileName),
    drawRectangleOnFaces: (fileName) => FaceDetector.drawRectangleOnFaces(fileName),
};
