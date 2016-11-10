/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import DimensionUtils from './../utils/dimensionUtils';

export default class MainMenuView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.hatIcon}
                       source={require('AddHat/app/assets/icons/hat-icon.png')}
                       resizeMode={'contain'}/>

                <View style={styles.buttonsContainer}>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#EF3071'}
                        onPress={Actions.camera}>

                        <Text style={styles.buttonText}>Camera</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#EF3071'}
                        onPress={Actions.gallery}>

                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableHighlight>
                </View>

                <Image style={styles.cactusIcon}
                       source={require('AddHat/app/assets/icons/cactus-icon.png')}
                       resizeMode={'contain'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: DimensionUtils.getHeightDimInPerc(1),
        borderColor: 'red',
        backgroundColor: '#FF4081',
        borderRadius: DimensionUtils.getHeightDimInPerc(25),
        height: DimensionUtils.getHeightDimInPerc(25),
        width: DimensionUtils.getHeightDimInPerc(25),
    },

    buttonText: {
        fontSize: DimensionUtils.getHeightDimInPerc(5.5),
        color: 'white'
    },

    hatIcon: {
        flex: 30,
    },

    cactusIcon: {
        flex: 30,
    }
});