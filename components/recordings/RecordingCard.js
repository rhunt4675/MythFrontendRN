import React from 'react';
import moment from 'moment';
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

export class RecordingCard extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _getTitleString() {
    const recording = this.props.recording;
    if (recording.SubTitle === '' || this.props.showTitle)
      return recording.Title;
    else if (recording.Season && recording.Episode && parseInt(recording.Season) > 0 && parseInt(recording.Episode) > 0)
      return recording.Season + 'x' + recording.Episode.padStart(2, '0') + ' - ' + recording.SubTitle;
    else
      return recording.SubTitle;
  }

  _getDateString() {
    const recording = this.props.recording;
    return moment(recording.StartTime).format('MMM Do YYYY, h:mm A');
  }

  _getSizeString() {
    const prefixes = ['B', 'KB', 'MB', 'GB'];
    const recording = this.props.recording;

    var size = recording.Recording.FileSize, idx = 0;
    while (idx < prefixes.length - 1 && size > 1) {
      size /= 1024.0; idx++;
    }
    return parseFloat(size).toFixed(idx == 0 ? 0 : 1) + prefixes[idx];
  }

  _onPress() {
    this.props.onRecordingPressed(this.props.recording);
  }

  render() {
    const recording = this.props.recording;
    const previewURI = this.props.screenProps.backendAddr + '/Content/GetPreviewImage?Height=100&RecordedId=' + recording.Recording.RecordedId;

    const watched = (parseInt(recording.ProgramFlags) & 0x200) !== 0;
    const titleStyle = {fontWeight: watched ? 'normal' : 'bold'};

    return (
      <Surface style={styles.surface}>
        <TouchableRipple onPress={this._onPress}>
          <View style={styles.wrapper}>
            <Image
              style={styles.image} 
              source={{uri: previewURI}} />
            <View style={styles.textcontent}>
              <Text style={[styles.title, titleStyle]} numberOfLines={1}>{this._getTitleString()}</Text>
              <View style={styles.descriptionWrapper}>
                <Text numberOfLines={2}>{'\n\n\n'}</Text>
                <Text numberOfLines={2}>{recording.Description}</Text>
              </View>
              <View style={styles.datesizepair}>
                <Text numberOfLines={1} style={styles.date}>{this._getDateString()}</Text>
                <Text style={styles.size}>{this._getSizeString()}</Text>
              </View>
            </View>
          </View>
        </TouchableRipple>
        {/*__DEV__ && <List.Accordion title="Debug"><Text>{JSON.stringify(this.props.recording)}</Text></List.Accordion>*/}
      </Surface>
    );
  }
}

const bannerImageWidth = Math.round(Dimensions.WindowSize.width / 3);
const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    borderRadius: 5,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: bannerImageWidth,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  textcontent: {
    flex: 1,
    maxHeight: 100,
    justifyContent: 'space-between',
    padding: 5,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 17,
  },
  descriptionWrapper: {
    flexDirection: 'row',
  },
  datesizepair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    flex: 3,
  },
  size: {
    flex: 1,
    textAlign: 'right',
  },
});