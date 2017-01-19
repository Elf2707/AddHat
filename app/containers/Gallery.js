/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GalleryView from './../components/GalleryView'
import * as PhotosListActions from './../actions/PhotosListActions';

class Gallery extends Component {
    render(){
        return (
            <GalleryView photos={this.props.photos}
                         onEndPhotosReached={this._handleOnPhotosEndReached.bind(this)}/>
        )
    }

    componentWillMount(){
        this.props.fetchPhotos();
    }

    _handleOnPhotosEndReached() {
        this.props.fetchPhotos(this.props.lastFetchedPhoto);
    }
}

const mapStateToProps = (state) => {
    return ({
        photos: state.photosList.photos,
        lastFetchedPhoto: state.photosList.lastFetchedPhoto,
        isPhotosPending: state.photosList.isPhotosPending,
    });
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(PhotosListActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);