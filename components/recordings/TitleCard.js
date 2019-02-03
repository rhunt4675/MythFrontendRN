import React from 'react';
import Dimensions from '../../constants/Layout';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { 
  Surface,
  Title,
  TouchableRipple,
} from 'react-native-paper';

export class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.props.onTitlePressed(this.props.name);
  }
  
  render() {
    const bannerURI = this.props.screenProps.backendAddr + '/Content/GetRecordingArtwork?Type=banner&Inetref=' + this.props.inetref;

    return (
      <Surface style={styles.surface}>
        <TouchableRipple onPress={this._onPress}>
          <View>
            <Image style={styles.image} 
              resizeMode='cover' 
              source={{uri: bannerURI}} />
            <Title style={styles.title} numberOfLines={1}>{this.props.name}</Title>
          </View>
        </TouchableRipple>
      </Surface>
    );
  }
}

// Aspect Ratio according to https://kodi.wiki/view/TV-Show_artwork#Banner
const bannerImageHeight = Math.round(Dimensions.WindowSize.width * 37 / 200);

const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: bannerImageHeight,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 6,
  },
});