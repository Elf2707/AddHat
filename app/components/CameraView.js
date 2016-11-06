/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import FaceDetector from './../services/rn-face-detected';
import DimensionUtils from './../utils/dimensionUtils';

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

                    <View style={styles.controlPanel}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {}}
                            underlayColor={'rgba(255, 255, 255, 0.4)'}>

                            <View style={styles.btnInsideContainer}>
                                <Image style={styles.buttonIcon}
                                       resizeMode={'contain'}
                                       source={require('AddHat/app/assets/ic_chevron_left.png')}/>

                                <Text style={[styles.text3per, styles.leftMarginMinus]}>Menu</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.button}
                            onPress={this.takePicture.bind(this)}
                            underlayColor={'rgba(255, 255, 255, 0.4)'}>

                            <Image style={styles.snapShotButtonIcon}
                                   resizeMode={'contain'}
                                   source={require('AddHat/app/assets/ic_camera.png')}/>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {}}
                            underlayColor={'rgba(255, 255, 255, 0.4)'}>

                            <View style={styles.btnInsideContainer}>
                                <Text style={[styles.text3per, styles.rightMarginMinus]}>Gallery</Text>
                                <Image style={styles.buttonIcon}
                                       resizeMode={'contain'}
                                       source={require('AddHat/app/assets/ic_chevron_right.png')}/>
                            </View>
                        </TouchableHighlight>
                    </View>
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
        position: 'absolute',
        width: DimensionUtils.getWidthDimInPerc(95),
        top: DimensionUtils.getHeightDimInPerc(85),
        left: DimensionUtils.getWidthDimInPerc(5),
        borderRadius: DimensionUtils.getHeightDimInPerc(2),
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        zIndex: 2,
    },

    button: {
        padding: DimensionUtils.getHeightDimInPerc(0.7),
        borderRadius: DimensionUtils.getHeightDimInPerc(2),
    },

    buttonIcon: {
        height: DimensionUtils.getHeightDimInPerc(8),
        width: DimensionUtils.getHeightDimInPerc(7),
    },

    snapShotButtonIcon: {
        height: DimensionUtils.getHeightDimInPerc(9),
        width: DimensionUtils.getHeightDimInPerc(9),
    },

    btnInsideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    leftMarginMinus: {
        marginLeft: -DimensionUtils.getHeightDimInPerc(2.1)
    },

    rightMarginMinus: {
        marginRight: -DimensionUtils.getHeightDimInPerc(2.2)
    },

    text3per: {
        color: '#FFF',
        fontSize: DimensionUtils.getHeightDimInPerc(3),
    }
});