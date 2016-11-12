/**
 * Created by Elf on 07.11.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ZoomableImage from './../components/ZoomableImage';

class Preview extends Component {
    render() {
        return (
            <ZoomableImage
                isPhotoProcessing={this.props.isPhotoProcessing}
                image={this.props.photo}/>
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