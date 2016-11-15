/**
 * Created by Elf on 10.11.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import DimensionUtils from './../utils/dimensionUtils';

export default class CameraControlPanel extends Component {
    static propTypes = {
        takeSnapShot: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={Actions.pop}
                    underlayColor={'rgba(255, 255, 255, 0.4)'}>

                    <View style={styles.btnInsideContainer}>
                        <Image style={styles.buttonIcon}
                               resizeMode={'contain'}
                               source={require('AddHat/app/assets/icons/ic_chevron_left.png')}/>

                        <Text style={[styles.text3per, styles.leftMarginMinus]}>Menu</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.takeSnapShot}
                    underlayColor={'rgba(255, 255, 255, 0.4)'}>

                    <Image style={styles.snapShotButtonIcon}
                           resizeMode={'contain'}
                           source={require('AddHat/app/assets/icons/ic_camera.png')}/>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={Actions.gallery}
                    underlayColor={'rgba(255, 255, 255, 0.4)'}>

                    <View style={styles.btnInsideContainer}>
                        <Text style={[styles.text3per, styles.rightMarginMinus]}>Gallery</Text>
                        <Image style={styles.buttonIcon}
                               resizeMode={'contain'}
                               source={require('AddHat/app/assets/icons/ic_chevron_right.png')}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: DimensionUtils.getWidthDimInPerc(90),
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