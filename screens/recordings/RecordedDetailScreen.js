import React from 'react';
import moment from 'moment';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FAB,
  Paragraph,
  Surface,
  Title,
} from 'react-native-paper';
// import { IntentLauncherAndroid as IntentLauncher } from 'expo';
import Dimensions from '../../constants/Layout';

export default class RecordedDetailScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true, 
    headerTintColor: 'white'
  };
  
  constructor(props) {
    super(props);
    // console.log(IntentLauncherAndroid.startActivityAsync.toString());
  };

  _getRuntimeString() {
    const recording = this.props.navigation.getParam('recording');
    const start = moment(recording.StartTime);
    const end = moment(recording.EndTime);
    const minutes = end.diff(start, 'minutes');
    const hours = Math.floor(minutes / 60);
    return (hours > 0 ? hours + 'h ' : '') + (minutes % 60) + 'min';
  }

  _getSizeString() {
    const recording = this.props.navigation.getParam('recording');
    const prefixes = ['B', 'KB', 'MB', 'GB'];

    var size = recording.Recording.FileSize, idx = 0;
    while (idx < prefixes.length - 1 && size > 1) {
      size /= 1024.0; idx++;
    }
    return parseFloat(size).toFixed(idx == 0 ? 0 : 1) + prefixes[idx];
  }

  _getSubTitleString() {
    const recording = this.props.navigation.getParam('recording');

    if (recording.Season && recording.Episode && parseInt(recording.Season) > 0 && parseInt(recording.Episode) > 0)
      return recording.Season + 'x' + recording.Episode.padStart(2, '0') + ' - ' + recording.SubTitle;
    else
      return recording.SubTitle;
  }

  render() {
    const recording = this.props.navigation.getParam('recording');
    const previewURI = this.props.screenProps.backendAddr + '/Content/GetPreviewImage?RecordedId=' + recording.Recording.RecordedId;
    const coverURI = this.props.screenProps.backendAddr + '/Content/GetRecordingArtwork?Type=coverart&Inetref=' + recording.Inetref + '&Season='+ recording.Season;
    const videoURI = this.props.screenProps.backendAddr + '/Content/GetRecording?RecordedId=' + recording.Recording.RecordedId;

    return (
      <View style={styles.flex}>
        <View style={styles.noScrollBox}>
          <ImageBackground style={styles.backgroundImage}
            source={{uri: previewURI}}>
            <View style={styles.backgroundImageSpacer} />
            <View style={[styles.header, styles.row]}>
              <Surface style={styles.coverSurface}>
                <Image style={styles.coverImage}
                  source={{uri: coverURI}} />
              </Surface>
              <View style={styles.flex}>
                <View style={styles.row}>
                  <View style={styles.flex} />
                  <FAB
                    style={styles.fab} 
                    icon='play-arrow'
                    onPress={() => IntentLauncher.startActivityAsync('android.intent.action.VIEW', 
                      {type: 'video/*', data: videoURI, category: 'android.intent.category.DEFAULT'})} />
                </View>
                <Title numberOfLines={1}>{recording.Title}</Title>
                <Paragraph numberOfLines={2}>{this._getSubTitleString()}</Paragraph>
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={styles.body}>
          <Paragraph>
            <Text style={styles.bold}>Description: </Text>
            {recording.Description}
          </Paragraph>
          <View style={styles.row}>
            <View style={styles.flex}>
              <Paragraph numberOfLines={1}>
                <Text style={styles.bold}>Runtime: </Text>
                {this._getRuntimeString()}
              </Paragraph>
              <Paragraph numberOfLines={1}>
                <Text style={styles.bold}>Airdate: </Text>
                {recording.Airdate}
              </Paragraph>
            </View>
            <View style={styles.flex}>
              <Paragraph numberOfLines={1}>
                <Text style={styles.bold}>Category: </Text>
                {recording.Category}
              </Paragraph>
              <Paragraph numberOfLines={1}>
                <Text style={styles.bold}>Disk Space: </Text>
                {this._getSizeString()}
              </Paragraph>
            </View>
          </View>
          <Text>{JSON.stringify(recording)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const previewImageWidth = Dimensions.WindowSize.width;
const previewImageHeight = Math.round(previewImageWidth * 9 / 16);
const coverImageWidth = Math.round(Dimensions.WindowSize.width / 4);
const coverImageHeight = Math.round(coverImageWidth * 3 / 2);
const fabRadius = 28, previewBorder = 1.5;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  noScrollBox: {
    width: '100%',
    height: previewImageHeight + coverImageHeight - fabRadius,
  },
  backgroundImage: {
    width: previewImageWidth,
    height: previewImageHeight,
  },
  backgroundImageSpacer: {
    height: previewImageHeight - fabRadius,
  },
  header: {
    paddingHorizontal: fabRadius,
    maxHeight: coverImageHeight + (2 * previewBorder),
  },
  coverSurface: {
    elevation: 3,
    borderWidth: previewBorder,
    borderColor: '#ffffff',
    marginRight: 10,
  },
  coverImage: {
    width: coverImageWidth,
    height: coverImageHeight,
  },
  fab: {
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  body: {
    marginHorizontal: fabRadius,
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  }
});