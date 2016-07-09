/**
 * Created by Elf on 08.07.2016.
 */
import React, {Component} from 'react';
import {Navigator,
        View,
        Text,
        Image,
        StyleSheet,
        Dimensions,
        TouchableHighlight} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class PhotoPreview extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
                                onPress={this.handleClosePreview}>
                    <Image  source={{uri: `file:${this.props.uri}`}}
                            style={styles.image}
                            resizeMode={'contain'}/>
            </TouchableHighlight>
        );
    }

    handleClosePreview(){
        Actions.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    image: {
        flex: 1
    }
});