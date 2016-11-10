/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';

import FaceDetector from './../services/rn-face-detected';
import DimensionUtils from './../utils/dimensionUtils';
import CameraControlPanel from './CameraControlPanel';

export default class CameraView extends Component {
    static propTypes = {
        onTakeSnapShot: React.PropTypes.func.isRequired
    };

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

                    <CameraControlPanel
                        style={styles.controlPanel}
                        takeSnapShot={this.takePicture.bind(this)}/>
                </View>
            </View>
        );
    }

    takePicture() {
        // Take snapshot
        this.camera.capture()
            .then((data) => {
                this.props.onTakeSnapShot(data.path)
            })
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    preview: {
        flex: 1,
    },

    controlPanel: {
        top: DimensionUtils.getHeightDimInPerc(85),
        left: DimensionUtils.getWidthDimInPerc(5),
    },
});