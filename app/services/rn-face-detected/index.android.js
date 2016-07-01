import React from 'react';
import {NativeModules} from 'react-native';

const FaceDetector = NativeModules.FaceDetector;

export default {
  greeting: (name) => {
      return new Promise((resolve, reject) => {
          resolve(FaceDetector.greeting(name));
      });
    }
};
