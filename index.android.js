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
  CameraRoll,
  TouchableHighlight,
  Dimensions,
  Platform,
  Image
} from 'react-native';

import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

export default class RNUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  openFile() {
    console.log('open file');

    let options = {
      title: '上传身份证',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
      cancelButtonTitle: '取消',
      
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {path: response.path, uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  upload() {
    console.log('upload photo');
    let formData = new FormData();
    let key = 'key';
    let token = '34567890';
    formData.append('file', {uri: this.state.avatarSource.uri, type: 'application/octet-stream', name: key});
    formData.append('key', key);
    formData.append('token', token);

    let opts = {};
    opts.body = formData;
    opts.method = 'post';

    let host = 'http://192.168.191.3';
    return fetch(host, opts).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.warn(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={this.openFile.bind(this)}>
          <Text>打开系统相册</Text>
        </TouchableHighlight>
        <Image source={this.state.avatarSource} style={styles.image} />
        <TouchableHighlight onPress={this.upload.bind(this)}>
          <Text>上传到服务器</Text>
        </TouchableHighlight>
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
