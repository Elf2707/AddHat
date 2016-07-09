/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image} from 'react-native';

import Camera from 'react-native-camera';
import FaceDetector from '../services/rn-face-detected';
import {Actions} from 'react-native-router-flux';

export default class CameraView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.preview}>
                    <Camera
                        ref={(cam) => {
                           this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        type={Camera.constants.Type.back}
                        target={Camera.constants.CaptureTarget.cameraRoll}
                        orientation={Camera.constants.Orientation.auto}
                        flashMode={Camera.constants.FlashMode.auto}>
                    </Camera>
                    <View>
                        <TouchableOpacity style={styles.capture}
                                          onPress={this.takePicture.bind(this)}>
                            <Text><Image source={require('./../assets/camera.png')}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                FaceDetector.detectFaces(data.path).then(result => {
                    FaceDetector.addHat();
                    FaceDetector.saveResultFile().then(result => {
                        Actions.photoPreview({uri: result});
                    });
                });
            })
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    preview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    capture: {
        padding: 10,
        margin: 40
    }
});