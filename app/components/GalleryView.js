/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import NavBar from './NavBar';
import DimensionUtils from './../utils/dimensionUtils';

export default class GalleryView extends Component {
    static propTypes = {
        photos: React.PropTypes.array.isRequired,
        onEndPhotosReached: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(props.photos)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    style={styles.navBar}
                    title={'Gallery'}/>

                <ListView contentContainerStyle={styles.photosGrid}
                          dataSource={this.state.dataSource}
                          onEndReached={this.props.endPhotosReached}
                          onEndReachedThreshold={100}
                          showsVerticalScrollIndicator={false}
                          enableEmptySections={true}
                          renderRow={this.renderPhotoCell.bind(this)}
                          renderSeparator={this.renderSeparator.bind(this)}
                          renderFooter={this.renderFooter.bind(this)}
                          render
                          pageSize={32}/>
            </View>
        );
    }

    renderPhotoCell(photo, sectionId, rowId) {
        return (
            <TouchableHighlight
                style={styles.photoButton}
                onPress={this._handlePhotoClick.bind(this, photo)}>
                <Image source={{uri: photo.uri}} style={styles.photo}/>
            </TouchableHighlight>
        );
    }

    renderFooter() {
        //return (
        //    <View style={styles.transactionsFooter}>
        //        <ActivityIndicator
        //            animating={true}
        //            color={'#000'}
        //            size="large"/>
        //    </View>
        //);
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View key={rowID}
                  style={styles.separator}/>
        );
    }

    componentWillReceiveProps(newProps) {
        //Get new photo array update state
        this.setState({
            dataSource: this.ds.cloneWithRows(newProps.photos)
        });
    }

    _handlePhotoClick(photo) {
        Actions.photo({photo});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBar: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF4081',
    },

    photosGrid: {
        width: DimensionUtils.getWidthDimInPerc(100),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },

    photoButton: {
        width: DimensionUtils.getHeightDimInPerc(14),
        height: DimensionUtils.getHeightDimInPerc(14),
    },

    photo: {
        width: DimensionUtils.getHeightDimInPerc(14),
        height: DimensionUtils.getHeightDimInPerc(14),
    },

    separator: {
        width: DimensionUtils.getHeightDimInPerc(1.5),
        height: DimensionUtils.getHeightDimInPerc(15.5),
    },

    transactionsFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});
