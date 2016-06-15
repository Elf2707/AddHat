/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraPage extends Component {
    render() {
        return (
            <View style={[styles.container, this.setBorder('red')]}>
                <View style={[styles.preview, this.setBorder('green')]}>
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
                </View>
                <TouchableHighlight style={[styles.capture, this.setBorder('red')]}
                                    underlayColor={'#ccc'}
                                    onPress={this.takePicture.bind(this)}>
                    <Text>[CAPTURE]</Text>
                </TouchableHighlight>
            </View>
        )
    }

    setBorder(color) {
        return {
            borderWidth: 4,
            borderColor: color
        }
    }

    takePicture() {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    preview: {
        flex: 9,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    capture: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 40
    }
});