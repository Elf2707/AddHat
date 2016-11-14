/**
 * Created by Elf on 08.07.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ZoomableImage from './ZoomableImage'

export default class PhotoView extends Component {
    static propTypes = {
        isPhotoProcessing: React.PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ZoomableImage
                image={this.props.photo}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f51b5'
    }
});