/**
 * Created by Elf on 27.08.2016.
 */
import React, { Component } from 'react';
import { View, Animated, StyleSheet, PanResponder, Image, Platform } from 'react-native';

import DimensionUtils from './../utils/dimensionUtils';
import PropsConfig from './../config/PropsConfig';

const calcDistance = (x1, y1, x2, y2) => {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

const calcCenter = (x1, y1, x2, y2) => {

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
};

const calcOffsetByZoom = (width, height, imageWidth, imageHeight, zoom) => {
    let xDiff = imageWidth * zoom - width;
    let yDiff = imageHeight * zoom - height;
    return {
        left: -xDiff / 2,
        top: -yDiff / 2,
    }
};

export default class ZoomableImage extends Component {
    static propTypes = {
        image: React.PropTypes.shape({
            height: React.PropTypes.number.isRequired,
            width: React.PropTypes.number.isRequired,
            uri: React.PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this._onLayout = this._onLayout.bind(this);

        this.state = {
            screenHeight: DimensionUtils.getHeightDimInPerc(100),
            screenWidth: DimensionUtils.getWidthDimInPerc(100),
            isLayoutInit: false,
            isZooming: false,
            isMoving: false,
            initialDistance: 0,
            offsetX: 0,
            position: new Animated.ValueXY(),
            minZoom: 0,
            maxZoom: 1,
            zoom: new Animated.Value(0),
        };
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}
                  onLayout={this._onLayout}>
                <Animated.Image
                    source={{uri: this.props.image.uri}}
                    style={[{
                        borderColor: 'red',
                        borderWidth: 2,
                        height: this.props.image.height,
                        width: this.props.image.width,
                        transform: this.state.position.getTranslateTransform().concat({
                            scale: this.state.zoom,
                        }),
                    }]}
                    {...this._panResponder.panHandlers}/>
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
            onPanResponderTerminate: this._handlePanResponderReleaseOrTermination.bind(this),

            onShouldBlockNativeResponder: (evt, gestureState) => true,

            onPanResponderGrant: this._handlePanResponderGrant.bind(this),

            onPanResponderMove: this._handlePanResponderMove.bind(this),

            onPanResponderRelease: this._handlePanResponderReleaseOrTermination.bind(this),
        });
    }

    _handlePanResponderGrant(e, gestureState) {
        const currX = this.state.position.x._value;
        const currY = this.state.position.y._value;
        console.log('offsetX: ' + currX);
        console.log('offsetY: ' + currY);

        this.state.position.setOffset({x: currX, y: currY});
        this.state.position.setValue({x: 0, y: 0});
    }

    _handlePanResponderMove(e, gestureState) {
        // Test if it is move or it is zooming
        let touches = e.nativeEvent.touches;
        if (touches.length == 2) {
            // Zooming
            this.processPinch(touches[0].pageX, touches[0].pageY,
                touches[1].pageX, touches[1].pageY);
        } else if (touches.length == 1) {
            // Moving
            this.processMove(e, gestureState);
        }
    }

    _handlePanResponderReleaseOrTermination(e, gestureState) {
        // Detect taps double and one tap
        this.detectTaps(gestureState);
        this.state.position.flattenOffset();

        this.controlBoardsAfterMoving();
    }

    _onLayout() {
        if (!this.state.isLayoutInit) {
            // Calc zoom for height match to screen height
            let zoom = this.state.screenHeight / this.props.image.height;
            this.state.zoom.setValue(zoom);

            const offsetX = (this.state.screenWidth - this.props.image.width * zoom) / 2;

            // Detect max zoom if picture less when screen zoom > 1 set maxZoom = zoom * 2
            let maxZoom = zoom < 1 ? 1 : zoom + 2;

            this.setState({
                maxZoom,
                minZoom: zoom,
                offsetX,
                isLayoutInit: true,
            });
        }
    }

    controlBoardsAfterMoving() {
        // Test if it goes out the boards return it back
        const currX = this.state.position.x._value;
        const currY = this.state.position.y._value;
        console.log('x: ' + currX);
        console.log('y: ' + currY);
        console.log('offset: ' + this.state.offsetX);

        // 4 edges 4 directions
        //if (currX > Math.abs(this.state.offsetX) && currY > 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: -this.state.offsetX, y: 0}
        //    }).start();
        //
        //} else if (currX > Math.abs(this.state.offsetX) && currY < 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: -this.state.offsetX, y: 0}
        //    }).start();
        //
        //} else if (currX < this.state.offsetX && currY < 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: this.state.offsetX, y: 0}
        //    }).start();
        //
        //} else if (currX < this.state.offsetX && currY > 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: this.state.offsetX, y: 0}
        //    }).start();
        //
        //} else if (currY > 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: currX, y: 0}
        //    }).start();
        //
        //} else if (currX > Math.abs(this.state.offsetX)) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: -this.state.offsetX, y: currY}
        //    }).start();
        //
        //} else if (currY < 0) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: currX, y: 0}
        //    }).start();
        //
        //} else if (currX < this.state.offsetX) {
        //    Animated.spring(this.state.position, {
        //        toValue: {x: this.state.offsetX, y: currY}
        //    }).start();
        //}

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
        const distance = calcDistance(x1, y1, x2, y2);

        if (!this.state.isZooming) {
            this.setState({
                isZooming: true,
                initialDistance: distance,
            });

        } else {
            let touchZoom = distance / this.state.initialDistance;
            let zoom = touchZoom * this.state.zoom._value > this.state.minZoom
                ? touchZoom * this.state.zoom._value : this.state.minZoom;
            console.log(touchZoom);
            Animated.spring(this.state.zoom, {
                toValue: zoom
            }).start(() => this.setState({
                isZooming: false,
                offsetX: this.state.offsetX * zoom,
            }));
        }
    }

    doubleTapPinch() {
        console.log('double tap tap tap tap tap tap tap tap tap tap tap tap tap tap ');
    }

    processMove(e, gestureState) {
        // Move image
        Animated.event([gestureState, {
            dx: this.state.position.x,
            dy: this.state.position.y
        }])(e, gestureState);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
