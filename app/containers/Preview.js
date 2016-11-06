/**
 * Created by Elf on 07.11.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux';

import PhotoView from './../components/PhotoView';

class Preview extends Component {
    render() {
        return (
            <PhotoView
                isPhotoProcessing={this.props.isPhotoProcessing}
                photoWithHatsFileName={this.props.photoWithHatsFileName}/>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        isPhotoProcessing: state.faceDetector.isPhotoProcessing,
        photoWithHatsFileName: state.faceDetector.photoWithHatsFileName,
    });
};

export default connect(mapStateToProps)(Preview);