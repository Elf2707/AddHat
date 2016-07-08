/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View,
        Text,
        StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class MainPage extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Button style={[styles.button, this.getButtonStyle(40, 'orange')]}
                        styleDisable={{color: '#cccccc'}}
                        onPress={Actions.camera}>Camera</Button>
                <Button style={[styles.button, this.getButtonStyle(40, 'coral')]}
                        styleDisable={{color: '#cccccc'}}
                        onPress={Actions.gallery}>Gallery</Button>

                <Button style={[styles.button, this.getButtonStyle(40, 'red')]}
                        styleDisable={{color: '#cccccc'}}
                        onPress={Actions.photoPreview}>Test</Button>
            </View>
        )
    }

    getButtonStyle(fontSize, color) {
        return {
            fontSize,
            color
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        marginBottom: 5
    }
});