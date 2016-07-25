/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions} from 'react-native';

import {Actions} from 'react-native-router-flux';

const CACTUS_ICON_RATIO = 1;
const HAT_ICON_RATIO = 1.8;

export default class MainPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.hatIcon, {
                            width: this.getWidthByPercents(90),
                            height: this.getWidthByPercents(90) / HAT_ICON_RATIO
                       }]}
                       source={require('./../assets/hat-icon.png')}
                       resizeMode='stretch' />
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity style={[styles.button,
                        this.getRoundButtonStyle( this.getWidthByPercents(35), '#ff4081')]}
                                      onPress={Actions.camera}>
                        <Text style={styles.buttonText}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button,
                        this.getRoundButtonStyle(this.getWidthByPercents(35), '#ff4081')]}
                                      onPress={Actions.gallery}>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                <Image style={[styles.cactusIcon, {
                            width: this.getWidthByPercents(40),
                            height: this.getWidthByPercents(40) / CACTUS_ICON_RATIO
                        }]}
                       source={require('./../assets/cactus-icon.png')}/>
            </View>
        )
    }

    //Object width from percents of screen width
    getWidthByPercents(percents) {
        return percents * Dimensions.get('window').width / 100;
    }

    getRoundButtonStyle(radius, backgroundColor) {
        return {
            backgroundColor,
            borderRadius: radius,
            height: radius,
            width: radius
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#3f51b5',
    },

    buttonsContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: 10
    },

    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'red'
    },

    buttonText: {
        fontSize: Dimensions.get('window').width * 7 / 100 ,
        color: 'white'
    },

    hatIcon: {
        marginBottom: 10,
        marginTop: 15
    },

    cactusIcon: {
        marginBottom: 10
    }
});