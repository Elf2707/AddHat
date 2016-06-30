/**
 * Created by Elf on 30.06.2016.
 */
import React, {Component} from 'react';
import { View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class PhotosList extends Component {
    constructor(props) {
        super(props);
    }

    renderPhotosList(photos) {
        return photos.map((photo, i) => {
            return (
                <Image source={{uri: photo.uri}}
                       style={styles.photo}
                       key={i}/>
            );
        })
    }

    render() {
        return (
            <View style={styles.photosContainer}>
                <View style={styles.textHeader}>
                    <Text>----- Total images in gallery: {this.props.photosCount} -----</Text>
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
        alignItems: 'center'
    },

    photosContainer: {
        flexDirection: 'column',
    },

    photosGrid: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    photo: {
        width: 100,
        height: 100,
        margin: 10
    }
})