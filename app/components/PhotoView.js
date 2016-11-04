/**
 * Created by Elf on 08.07.2016.
 */
import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

import ZoomableImage from './ZoomImage'

export default class PhotoView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ZoomableImage source={{uri: this.props.photo.uri}}
                           imageWidth={this.props.photo.width}
                           imageHeight={this.props.photo.height}
                           style={styles.container} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f51b5'
    }
});