/**
 * Created by Elf on 12.06.2016.
 */
import React, {Component} from 'react';
import CameraRoll from 'rn-camera-roll';
import PhotosList from '../components/photosList';

const PHOTOS_COUNT_BY_FETCH = 24;

export default class GlaryComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            photos: [],
            photosCount: 0
        }
    }

    componentWillMount(){
        this.fetchPhotos();
    }

    getPhotosFromCameraRollData(data) {
        return data.edges.map((asset) => {
            return asset.node.image;
        });
    }

    onPhotosFetchedSuccess(data) {
        const newPhotos = this.getPhotosFromCameraRollData(data);
        //this.images = this.images.concat(newPhotos);

        this.setState({
            photos: newPhotos,
            photosCount: newPhotos.length
        });
        //if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
    }

    onPhotosFetchError(err) {
        // Handle error here
        console.log(err);
    }

    fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
        CameraRoll.getPhotos({
            first: count,
            after,
        }, this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this));
    }

    onEndReached() {
        //this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched);
    }

    render(){
        return <PhotosList photosCount={this.state.photosCount}
                           photos={this.state.photos} />
    }
}