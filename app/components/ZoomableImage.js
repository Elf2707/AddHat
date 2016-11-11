/**
 * Created by Elf on 27.08.2016.
 */
import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Image, Platform } from 'react-native';

import DimensionUtils from './../utils/dimensionUtils';
import PropsConfig from './../config/PropsConfig';

const getDistance = (x1, y1, x2, y2) => {
    let dx = Math.abs(x1 - x2)
    let dy = Math.abs(y1 - y2)
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

const getCenter = (x1, y1, x2, y2) => {

    function middle(p1, p2) {
        return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
    }

    return {
        x: middle(x1, x2),
        y: middle(y1, y2),
    };
};

const maxOffset = (offset, windowDimension, imageDimension) => {
    let max = windowDimension - imageDimension;
    if (max >= 0) {
        return 0;
    }
    return offset < max ? max : offset;
}

const getOffsetByZoom = (width, height, imageWidth, imageHeight, zoom) => {
    let xDiff = imageWidth * zoom - width;
    let yDiff = imageHeight * zoom - height;
    return {
        left: -xDiff / 2,
        top: -yDiff / 2
    }
}

export default class ZoomableImage extends Component {
    constructor(props) {
        super(props);

        this._onLayout = this._onLayout.bind(this);

        this.state = {
            isLayoutInit: false,
            width: DimensionUtils.getWidthDimInPerc(100),
            height: DimensionUtils.getHeightDimInPerc(100),
            zoom: null,
            minZoom: null,
            maxZoom: 1,
            isZooming: false,
            isMoving: false,
            initialDistance: null,
            initialX: null,
            initialY: null,
            initialTop: 0,
            initialLeft: 0,
            initialTopWithoutZoom: 0,
            initialLeftWithoutZoom: 0,
            initialZoom: 1,
            top: 0,
            left: 0,
            blurImageRef: -1,
        };
    }

    render() {
        return (
            <View style={styles.imageContainer}
                {...this._panResponder.panHandlers}
                  onLayout={this._onLayout}>
                <Image source={this.props.source}
                       style={{
                        position: 'absolute',
                        top: this.state.top,
                        left: this.state.left,
                        width: this.props.imageWidth * this.state.zoom,
                        height: this.props.imageHeight * this.state.zoom
                       }}/>
            </View>
        );
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true,

            onPanResponderGrant: this._handlePanResponderGrant.bind(this),

            onPanResponderMove: this._handlePanResponderMove.bind(this),

            onPanResponderRelease: this._handlePanResponderRelease.bind(this),
        });
    }

    _handlePanResponderGrant(e, gestureState) {
    }

    _handlePanResponderMove(e, gestureState) {
        // Test if it is move or it is zooming
        let touches = e.nativeEvent.touches;
        if (touches.length == 2) {
            // Zooming
            this.processPinch(touches[0].pageX, touches[0].pageY,
                touches[1].pageX, touches[1].pageY);
        } else if (touches.length == 1 && !this.state.isZooming) {
            // Moving
            this.processTouch(touches[0].pageX, touches[0].pageY)
        }
    }

    _handlePanResponderRelease(e, gestureState) {
        // Detect taps double and one tap
        this.detectTaps(gestureState);

        this.setState({
            isZooming: false,
            isMoving: false
        });
    }

    _onLayout() {
        if (!this.state.isLayoutInit) {
            this.calcLayoutForImage();
        }
    }

    calcLayoutForImage() {
        let zoom = this.state.height / this.props.imageHeight;

        // Detect max zoom if picture less when screen zoom > 1 set maxZoom = zoom * 2
        let maxZoom = zoom < 1 ? 1 : zoom + 2;

        // Center image horizontally
        let offsetLeft = (this.state.width - this.props.imageWidth * zoom) / 2;

        this.setState({
            zoom,
            left: offsetLeft,
            top: 0,
            minZoom: zoom,
            maxZoom,
            isLayoutInit: true,
        });
    }

    detectTaps({dx, dy}) {
        // Test if where was no zooming and gesture do not move more 2px it is tap
        if (!this.state.isZooming && Math.abs(dx) < 2 && Math.abs(dy) < 2) {

            // Start double tap threshold timer
            if (!this.doubleClickTimer) {
                this.doubleClickTimer = setTimeout(() => {
                    // Timer work so it was single click
                    clearTimeout(this.doubleClickTimer);
                    delete this.doubleClickTimer;

                    this.props.showWeather();
                }, PropsConfig.doubleClickThreshold);
            } else {
                // It is double click clear timer clear timer
                clearTimeout(this.doubleClickTimer);
                delete this.doubleClickTimer;

                // Make double tap pinch
                this.doubleTapPinch();
            }
        }
    }

    processPinch(x1, y1, x2, y2) {
        let distance = getDistance(x1, y1, x2, y2);
        let center = getCenter(x1, y1, x2, y2);

        if (!this.state.isZooming) {
            // Zoom start
            let offsetByZoom = getOffsetByZoom(this.state.width, this.state.height,
                this.props.imageWidth, this.props.imageHeight, this.state.zoom);
            this.setState({
                isZooming: true,
                initialDistance: distance,
                initialX: center.x,
                initialY: center.y,
                initialTop: this.state.top,
                initialLeft: this.state.left,
                initialZoom: this.state.zoom,
                initialTopWithoutZoom: this.state.top - offsetByZoom.top,
                initialLeftWithoutZoom: this.state.left - offsetByZoom.left,
            });
        } else {
            // Zoom process
            let touchZoom = distance / this.state.initialDistance;

            let zoom = touchZoom * this.state.initialZoom;

            // Do not zooming less then minZoom and above maxZoom
            zoom = zoom > this.state.minZoom ? zoom : this.state.minZoom;

            zoom = zoom < this.state.maxZoom ? zoom : this.state.maxZoom;

            let offsetByZoom = getOffsetByZoom(this.state.width, this.state.height,
                this.props.imageWidth, this.props.imageHeight, zoom);
            let left = (this.state.initialLeftWithoutZoom * touchZoom) + offsetByZoom.left;
            let top = (this.state.initialTopWithoutZoom * touchZoom) + offsetByZoom.top;

            this.setState({
                zoom: zoom,
                left: left > 0 ? 0 : maxOffset(left, this.state.width, this.props.imageWidth * zoom),
                top: top > 0 ? 0 : maxOffset(top, this.state.height, this.props.imageHeight * zoom)
            });
        }
    }

    doubleTapPinch() {
        // Get initial zoom data
        let offsetByZoom = getOffsetByZoom(this.state.width, this.state.height,
            this.props.imageWidth, this.props.imageHeight, this.state.zoom);
        this.setState({
            isZooming: true,
            initialTop: this.state.top,
            initialLeft: this.state.left,
            initialZoom: this.state.zoom,
            initialTopWithoutZoom: this.state.top - offsetByZoom.top,
            initialLeftWithoutZoom: this.state.left - offsetByZoom.left,
        });

        // Calc new zoom
        let zoom = this.state.zoom;

        // Zooming always in three times if current zoom was maxZoom
        // go to minimal zoom
        if (zoom === this.state.maxZoom) {
            zoom = this.state.minZoom;
        } else {
            zoom *= PropsConfig.zoomDoubleTapScale;
            // Do not zooming more then maxZoom
            zoom = zoom < this.state.maxZoom ? zoom : this.state.maxZoom;
        }

        // Get new zoom data
        offsetByZoom = getOffsetByZoom(this.state.width, this.state.height,
            this.props.imageWidth, this.props.imageHeight, zoom);

        let left = (this.state.initialLeftWithoutZoom * PropsConfig.zoomDoubleTapScale) +
            offsetByZoom.left;

        let top = (this.state.initialTopWithoutZoom * PropsConfig.zoomDoubleTapScale) +
            offsetByZoom.top;

        this.setState({
            zoom: zoom,
            left: left > 0 ? 0 : maxOffset(left, this.state.width, this.props.imageWidth * zoom),
            top: top > 0 ? 0 : maxOffset(top, this.state.height, this.props.imageHeight * zoom)
        });
    }

    processTouch(x, y) {
        if (!this.state.isMoving) {
            this.setState({
                isMoving: true,
                initialX: x,
                initialY: y,
                initialTop: this.state.top,
                initialLeft: this.state.left,
            });
        } else {
            let left = this.state.initialLeft + x - this.state.initialX;
            let top = this.state.initialTop + y - this.state.initialY;

            this.setState({
                left: left > 0 ? 0 : maxOffset(left, this.state.width,
                    this.props.imageWidth * this.state.zoom),
                top: top > 0 ? 0 : maxOffset(top,
                    this.state.height, this.props.imageHeight * this.state.zoom),
            });
        }
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
});
