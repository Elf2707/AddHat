/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FaceDetector from './../services/rn-face-detected';
import CameraView from '../components/CameraView';
import * as FaceDetectionActions from './../actions/FaceDetectionActions';

class Camera extends Component {
    constructor(props) {
        super(props);

        this.handleSnapShot = this.handleSnapShot.bind(this);
    }

    render() {
        return (
            <CameraView
                onTakeSnapShot={this.handleSnapShot}/>
        );
    }

    handleSnapShot(path) {
        // Detect faces on last snapshot and go to preview page
        if(this.props.isPhotoProcessing || path === '') {
            return;
        }

        this.props.addHatsToFaces(path);
        Actions.photoPreview();
    }
}

const mapStateToProps = (state) => {
    return ({
        isPhotoProcessing: state.faceDetector.isPhotoProcessing,
    });
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(FaceDetectionActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);