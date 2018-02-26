import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import {
  Button,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Lightbox from 'react-native-lightbox';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imgFull: {
    flex: 1,
    maxHeight: '100%',
    maxWidth: '100%',
  },
  imgThumb: {
    height: 250,
    width: 250,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.clearImage = this.clearImage.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.state = { image: null };
  }

  clearImage() {
    this.setState({ image: null });
  }

  async pickImage() {
    const image = await ImagePicker.launchImageLibraryAsync({
      exif: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  }

  render() {
    const { image } = this.state;

    let buttonTitle = 'select photo';
    let buttonOnPress = this.pickImage;
    let Img = () => null;

    if (image) {
      const { uri } = image;
      buttonTitle = 'clear photo';
      buttonOnPress = this.clearImage;
      Img = () => (
        <Lightbox activeProps={{ style: styles.imgFull }}>
          <Image source={{ uri }} style={styles.imgThumb} />
        </Lightbox>
      );
    }

    return (
      <View style={styles.container}>
        <Img />
        <Button title={buttonTitle} onPress={buttonOnPress} />
      </View>
    );
  }
}
