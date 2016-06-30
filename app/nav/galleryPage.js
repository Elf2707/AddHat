/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import GalleryComponent from '../containers/galleryComponent'


export default class GalleryPage extends Component {
    render(){
        return (
            <View>
                <GalleryComponent />
            </View>
        )
    }
}