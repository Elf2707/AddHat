/**
 * Created by Elf on 11.06.2016.
 */
import React, { Component } from 'react';
import { Router, Scene, Reducer } from 'react-native-router-flux';

import MainMenuView from './../components/MainMenuView';
import Camera from './Camera';
import Gallery from './Gallery';
import PhotoView from './../components/PhotoView';
import PhotoPreview from './../components/PhotoPreview';
import DimensionUtils from './../utils/dimensionUtils';


const reducerCreate = params=> {
    const defaultReducer = Reducer(params);
    return (state, action) => {
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
        style.marginTop = computedProps.hideNavBar ? 0 : DimensionUtils.getHeightDimInPerc(10);
        style.marginBottom = computedProps.hideTabBar ? 0 : DimensionUtils.getHeightDimInPerc(10);
    }

    return style;
};

const titleStyle = {
    fontSize: DimensionUtils.getHeightDimInPerc(8),
    color: 'white',
    marginTop: 5
};

const navBarStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303f9f',
    height: DimensionUtils.getHeightDimInPerc(10),
};

const leftButtonStyle = {
    top: DimensionUtils.getHeightDimInPerc(2),
    left: DimensionUtils.getWidthDimInPerc(8),
};

export default class App extends Component {
    render() {
        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene key='root'
                       titleStyle={titleStyle}
                       hideTabBar
                       hideNavBar
                       navigationBarStyle={navBarStyle}
                       leftButtonStyle={leftButtonStyle}>

                    <Scene key='main'
                           component={MainMenuView}
                           title='Add Hat'
                           initial={true}/>

                    <Scene key='camera'
                           component={Camera}
                           title='Camera'/>

                    <Scene key='gallery'
                           component={Gallery}
                           title='Gallery'/>

                    <Scene key='photo'
                           component={PhotoView}
                           title='Photo'/>

                    <Scene key='photoPreview'
                           component={PhotoPreview}
                           title='Preview'/>
                </Scene>
            </Router>
        );
    }
}
