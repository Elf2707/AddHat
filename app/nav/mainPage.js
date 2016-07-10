/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class MainPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.hatIcon}
                       source={require('./../assets/hat-icon.png')}/>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, this.getRoundButtonStyle(200, '#ff4081')]}
                                      onPress={Actions.camera}>
                        <Text style={styles.buttonText}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, this.getRoundButtonStyle(200, '#ff4081')]}
                                      onPress={Actions.gallery}>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.cactusIcon}
                       source={require('./../assets/cactus-icon.png')}/>
            </View>
        )
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f51b5'
    },

    buttonsContainer: {
        padding: 40,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'red'
    },

    buttonText: {
        fontSize: 40,
        color: 'white'
    },

    hatIcon: {
        marginTop: 40
    },

    cactusIcon: {
        marginBottom: 50
    }
});