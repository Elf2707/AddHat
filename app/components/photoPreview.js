/**
 * Created by Elf on 08.07.2016.
 */
import React, {Component} from 'react';
import {Navigator,
        View,
        Text,
        StyleSheet} from 'react-native';

import ImagePreview from 'react-native-image-preview';

export default class PhotoPreview extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: true
        };
    }

    render() {
        return (
            <ImagePreview visible={this.state.visible} close={this.handleClosePreview} />
        );
    }

    handleClosePreview(){
        this.setState({
            visible: false
        });
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});