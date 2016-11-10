/**
 * Created by Elf on 30.06.2016.
 */
import React, {Component} from 'react';
import { View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ListView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class PhotosList extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: this.ds.cloneWithRows(props.photos)
        }
    }

    componentWillReceiveProps(newProps) {
        //Get new photo array update state
        this.setState({
            dataSource: this.ds.cloneWithRows(newProps.photos)
        });
    }

    renderPhotoCell(photo) {
        return (
            <TouchableOpacity onPress={this.handlePhotoClick.bind(this, photo)}>
                <Image source={{uri: photo.uri}} style={styles.photo}/>
            </TouchableOpacity>
        );
    }

    handlePhotoClick(photo) {
        Actions.photo({photo});
    }

    render() {
        return (
            <View style={styles.photosContainer}>
                <View style={styles.textHeader}>
                    <Text style={styles.text}>----- Total images in gallery: {this.props.photos.length} -----</Text>
                </View>
                <ListView contentContainerStyle={styles.photosGrid}
                          dataSource={this.state.dataSource}
                          onEndReached={this.props.endPhotosReached}
                          onEndReachedThreshold={100}
                          showsVerticalScrollIndicator={false}
                          enableEmptySections={true}
                          renderRow={this.renderPhotoCell.bind(this)}
                          pageSize={32}/>
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
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3f51b5',
        justifyContent: 'flex-start'
    },

    photosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'center',
    },

    photo: {
        width: 150,
        height: 150,
        margin: 15
    }
});