/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  DeviceEventEmitter,
  NativeModules,
  CameraRoll,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

var RNUploader = require('NativeModules').RNUploader;

// import Camera from 'react-native-camera';

export default class RNUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: ''
    }
  }

  componentDidMount() {
    const fetchParams = {
      first: 5
    };
    CameraRoll.getPhotos(fetchParams).then((data) => {
      console.log(data);
      this.storeImages(data);
    });
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => {return asset.node.image});
    this.setState({
      images: images
    });
  }

  logImgError(err) {
    console.log(err);
  }

  render() {
    // <Camera
    //   ref={(cam) => {
    //     this.camera = cam;
    //   }}
    //   style={styles.preview}
    //   aspect={Camera.constants.Aspect.fill} >
    //   <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
    // </Camera>
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <ScrollView style={styles.container1}>
        <View style={styles.imageGrid}>
          { this.state.images.map((image, id) => <Image key={id} style={styles.image} source={{ uri: image.uri }} />) }
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container1: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

AppRegistry.registerComponent('RNUpload', () => RNUpload);
