/**
 * Created by Elf on 08.07.2016.
 */
import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';

import ZoomableImage from './ZoomableImage'

export default class PhotoView extends Component {
  static propTypes = {
    isPhotoProcessing: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    photoFileName: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  renderContent() {
    //return (
      //<ZoomableImage
        //image={this.props.photoFileName}/>
    //);

    if (this.props.error) {
      return (
        <Text style={styles.errorText}>
          Sorry. There was an error while processing an image
        </Text>
      );
    }

    if (this.props.isPhotoProcessing) {
      return (
        <ActivityIndicator
          size="large"
          color={'#FFF'}
        />
      );
    }

    return (
      <Image style={{width: 400, height: 400}} source={{uri:this.props.image}}/>
    );
  }

  render() {
    console.log(this.props.photo);
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f51b5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: '#FFF',
    textAlign: 'center',
  },
});