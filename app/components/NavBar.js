/**
 * Created by Elf on 15.10.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import DimensionUtils from './../utils/dimensionUtils';

export default class NavBar extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableHighlight
                    style={styles.backBtn}
                    onPress={Actions.pop}
                    underlayColor={'rgba(0, 0, 0, 0.2)'}>

                    <Image
                        style={styles.backBtnIcon}
                        source={require('AddHat/app/assets/icons/ic_chevron_left.png')}
                        resizeMode={'contain'}/>
                </TouchableHighlight>

                <View style={styles.titleCont}>
                    <Text style={[styles.text3per, styles.whiteText]}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: DimensionUtils.getHeightDimInPerc(10),
        backgroundColor: '#3f51b5',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: DimensionUtils.getHeightDimInPerc(3),
            },
        }),
    },

    backBtn: {
        padding: DimensionUtils.getWidthDimInPerc(1.5),
        paddingLeft: DimensionUtils.getWidthDimInPerc(0.5),
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },

    backBtnIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: DimensionUtils.getHeightDimInPerc(7),
        width: DimensionUtils.getWidthDimInPerc(10),
    },

    titleCont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: DimensionUtils.getWidthDimInPerc(64),
        marginRight: DimensionUtils.getWidthDimInPerc(18),
    },

    text3per: {
        fontSize: DimensionUtils.getHeightDimInPerc(3),
    },

    whiteText: {
        color: '#FFF',
    }
});
