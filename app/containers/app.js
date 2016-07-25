/**
 * Created by Elf on 11.06.2016.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Router, Scene, Reducer} from 'react-native-router-flux';

import MainPage from './../nav/mainPage';
import CameraPage from './../nav/cameraPage';
import GalleryPage from './../nav/galleryPage';
import Photo from './../components/photo';
import PhotoPreview from './../components/photoPreview';


const reducerCreate = params=> {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
        return defaultReducer(state, action);
    }
};

// define this based on the styles/dimensions you use
const getSceneStyle = function (/* NavigationSceneRendererProps */ props, computedProps) {
    const style = {
        flex: 1,
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
        backgroundColor: '#3f51b5'
    };

    if (computedProps.isActive) {
       style.marginTop = computedProps.hideNavBar ? 0 : Dimensions.get('window').height * 10 / 100;
    }
    return style;
};

const titleStyle = {
    fontSize: Dimensions.get('window').width * 8 / 100,
    color: 'white',
    marginTop: 5
}

const navBarStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303f9f',
    height: Dimensions.get('window').height * 10 / 100
}

const leftButtonStyle = {
    top: Dimensions.get('window').height * 2 / 100,
    left: 20
}

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene  key="root"
                        hideTabBar
                        titleStyle={titleStyle}
                        navigationBarStyle={navBarStyle}
                        leftButtonStyle={leftButtonStyle}>
                    <Scene key="main"
                           component={MainPage}
                           title="Add Hat"
                           initial={true}/>

                    <Scene key="camera"
                           component={CameraPage}
                           title="Camera"/>

                    <Scene key="gallery"
                           component={GalleryPage}
                           title="Gallery"/>

                    <Scene key="photo"
                           component={Photo}
                           title="Photo"/>

                    <Scene key="photoPreview"
                           hideNavBar
                           component={PhotoPreview}
                           title="Preview"/>
                </Scene>
            </Router>
        )
    }
}
