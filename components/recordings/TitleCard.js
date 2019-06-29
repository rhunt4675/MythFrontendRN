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

// Aspect Ratio according to https://kodi.wiki/view/TV-Show_artwork#Banner
const BANNER_WIDTH = '100%';
const BANNER_HEIGHT = Math.round(Dimensions.WindowSize.width * 37 / 200);

export class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);

    this.state = {
      bannerHeight: BANNER_HEIGHT,
      bannerWidth: BANNER_WIDTH,
    }
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
            <Image
              style={{...styles.image, height: this.state.bannerHeight, width: this.state.bannerWidth}}
              resizeMode='cover' 
              onError={() => this.setState({bannerHeight: undefined, bannerWidth: undefined})}
              source={{uri: bannerURI}} />
            <Title style={styles.title} numberOfLines={1}>{this.props.name}</Title>
          </View>
        </TouchableRipple>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 6,
  },
});