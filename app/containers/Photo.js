/**
 * Created by Elf on 07.11.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PhotoView from '../components/PhotoView';

class Photo extends Component {
    render() {
        return (
            <PhotoView
                isPhotoProcessing={this.props.isPhotoProcessing}
                photo={this.props.photo}
                error={this.props.error}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { isPhotoProcessing, error, photo } = state.faceDetector;
    return ({
        error,
        isPhotoProcessing,
        photo,
    });
};

export default connect(mapStateToProps)(Photo);