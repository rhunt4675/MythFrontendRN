import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  View,
} from 'react-native';
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import { Video } from 'expo-av';
import VideoPlayer from '@expo/videoplayer';

export default class RecordedDetailScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  constructor(props) {
    super(props);
    this._refresh = this._refresh.bind(this);
  };

  componentDidMount() {
    this._refresh();
    // IntentLauncherAndroid.startActivityAsync('android.intent.action.VIEW', {}, this._getRecordingUri());
    // IntentLauncherAndroid.startActivityAsync('android.intent.action.OPEN_DOCUMENT', {'android.intent.extra.MIME_TYPES': ['video/*']}, this._getRecordingUri());
    IntentLauncherAndroid.startActivityAsync('is.xyz.mpv.MPVActivity', {}, this._getRecordingUri());
  }

  _refresh() {

  }

  _getRecordingUri() {
    const recording = this.props.navigation.getParam('recording');
    return 'http://192.168.83.76:6544/Content/GetRecording?RecordedId=' + recording.Recording.RecordedId;
    // return 'video://192.168.83.76:6544/Content/GetRecording?RecordedId=' + recording.Recording.RecordedId;
  }

  //{/*<ScrollView><Text>{JSON.stringify(this.props.navigation.getParam('recording'))}</Text></ScrollView>*/}
  /*
          <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: this._getRecordingUri(),
            },
          }}
          isPortrait={true}
          playFromPositionMillis={0} />
          */

  /*
        <View style={{ flex: 1 }}>
        <Video
          source={{ uri: this._getRecordingUri() }}
          style={{ flex: 1 }}
          useNativeControls
          shouldPlay />
      </View>
  */
  render() {
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({

});