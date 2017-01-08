import React from 'react';
import { NativeModules } from 'react-native';

const FaceDetector = NativeModules.RnFaceDetector;

export default {
    addHats: async (fileName) => FaceDetector.addHats(fileName),
    drawRectangleOnFaces: (fileName) => FaceDetector.drawRectangleOnFaces(fileName),
};
