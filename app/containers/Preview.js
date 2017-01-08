/**
 * Created by Elf on 07.11.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PhotoView from '../components/PhotoView';

class Preview extends Component {
    render() {
        return (
            <PhotoView
                isPhotoProcessing={this.props.isPhotoProcessing}
                image={this.props.photoFileName}
                error={this.props.error}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { isPhotoProcessing, error, photoFileName } = state.faceDetector;
    return ({
        isPhotoProcessing,
        error,
        photoFileName,
    });
};

export default connect(mapStateToProps)(Preview);