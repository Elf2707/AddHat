/**
 * Created by Elf on 30.06.2016.
 */
import React, {Component} from 'react';
import { View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class PhotosList extends Component {
    constructor(props) {
        super(props);
    }

    renderPhotosList(photos) {
        return photos.map((photo, i) => {
            return (
                <TouchableOpacity onPress={this.handlePhotoClick(photo)} key={i}>
                    <Image source={{uri: photo.uri}} style={styles.photo}/>
                </TouchableOpacity>
            );
        })
    }

    handlePhotoClick(photo) {
        return () => {
            Actions.photo({photo});
        }
    }

    render() {
        return (
            <View style={styles.photosContainer}>
                <View style={styles.textHeader}>
                    <Text style={styles.text}>----- Total images in gallery: {this.props.photosCount} -----</Text>
                </View>
                <View style={styles.photosGrid}>
                    {this.renderPhotosList(this.props.photos)}
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    textHeader: {
        alignItems: 'center',
        marginTop: 10
    },

    text: {
        fontSize: 20,
        color: 'white'
    },

    photosContainer: {
        flexDirection: 'column',
        backgroundColor: '#3f51b5',
    },

    photosGrid: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },

    photo: {
        width: 150,
        height: 150,
        margin: 15
    }
})