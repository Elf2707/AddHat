/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class MainPage extends Component {
    render(){
        return (
            <View>
                <Text onPress={Actions.camera}>Camera</Text>
                <Text onPress={Actions.gallery}>Gallery</Text>
            </View>
        )
    }
}