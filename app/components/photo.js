/**
 * Created by Elf on 08.07.2016.
 */
import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';

export default class Photo extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image  style={styles.photoImage}
                            source={{uri: this.props.uri}} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    photoImage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});