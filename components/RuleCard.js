import React from 'react';
import Dimensions from '../constants/Layout';
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

export class RuleCard extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.props.onPress(this.props.rule);
  }

  render() {
    const rule = this.props.rule;
    const bannerURI = this.props.screenProps.backendAddr + '/Content/GetRecordingArtwork?Type=banner&Inetref=' + rule.Inetref;

    return (
      <Surface style={styles.surface}>
        <TouchableRipple onPress={this._onPress}>
          <View>
            <Image style={styles.image} 
              resizeMode='cover' 
              source={{uri: bannerURI}} />
            <View style={styles.textWrapper}>
              <Title style={{flex: 1}} numberOfLines={1}>{rule.Title}</Title>
              <Text style={styles.typeText} numberOfLines={1}>{rule.Type}</Text>
            </View>
            {/*<Text>{JSON.stringify(rule)}</Text>*/}
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
  textWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeText: {
    fontStyle: 'italic',
    marginLeft: 10,
  },
});