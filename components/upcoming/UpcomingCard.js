import React from 'react';
import moment from 'moment';
import Dimensions from '../../constants/Layout';
import {
  RecStatusMap
} from '../../constants/MythTV';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { 
  Card,
  List,
  Paragraph,
  Surface,
  Title,
  TouchableRipple,
} from 'react-native-paper';

export class UpcomingCard extends React.Component {
  constructor(props) {
    super(props);
  }

  _getUpcomingTimeString() {
    const upcoming = this.props.upcoming;
    const startTime = moment(upcoming.StartTime), now = moment();
    return startTime.calendar();
  }

  render() {
    const upcoming = this.props.upcoming;
    var recordingStatus = upcoming.Recording.Status;
    var bannerURL = upcoming.Artwork.ArtworkInfos
      .filter(artworkInfo => artworkInfo.Type === 'banner')
      .map(artworkInfo => artworkInfo.URL)
      .shift();

    var dynamicStyles = {
      timelineDot: {
        backgroundColor: RecStatusMap[recordingStatus].Color,
      },
      surface: {
        backgroundColor: RecStatusMap[recordingStatus].Active ? 'white' : 'rgba(200, 200, 200, 0.8)',
        elevation: RecStatusMap[recordingStatus].Active ? 3 : 0,
      },
      image: {
        opacity: RecStatusMap[recordingStatus].Active ? 1 : 0.4,
      },
      text: {
        color: RecStatusMap[recordingStatus].Active ? 'black' : 'gray',
      }
    }

    return (
      <View style={[styles.flex, styles.row]}>
        <View style={styles.alignCenter}>
          <View style={styles.upperLine} />
          <View style={[styles.timelineDot, dynamicStyles.timelineDot]} />
          <View style={styles.lowerLine} />
        </View>
        <View style={[styles.flex, styles.contentWrapper]}>
          <View style={[styles.flex, styles.row]}>
            <Text style={[styles.timeText, styles.flex]} numberOfLines={1}>{this._getUpcomingTimeString()}</Text>
            <View style={styles.horizontalSpacer} />
            <Text style={styles.statusText} numberOfLines={1}>{RecStatusMap[recordingStatus].Name}</Text>
          </View>
          <Surface style={[styles.surface, dynamicStyles.surface]}>
            <View>
              {bannerURL && <Image style={[styles.image, dynamicStyles.image]} resizeMode='cover' source={{uri: this.props.screenProps.backendAddr + bannerURL}} />}
              <View style={styles.textWrapper}>
                <Title style={dynamicStyles.text} numberOfLines={1}>{upcoming.Title}</Title>
                <View style={styles.splitFields}>
                  <Text style={[styles.flex, dynamicStyles.text]} numberOfLines={1}>{upcoming.SubTitle}</Text>
                  <View style={styles.horizontalSpacer} />
                  <Text style={dynamicStyles.text} numberOfLines={1}>{upcoming.Channel.ChanNum + ' ' + upcoming.Channel.ChannelName}</Text>
                </View>
              </View>
            </View>
            {/*__DEV__ && <List.Accordion title="Debug"><Text>{JSON.stringify(this.props.upcoming)}</Text></List.Accordion>*/}
          </Surface>
        </View>
      </View>
    );
  }
}

// Aspect Ratio according to https://kodi.wiki/view/TV-Show_artwork#Banner
const bannerImageHeight = Math.round(Dimensions.WindowSize.width * 37 / 200);
const timelineVerticalOffset = 10;
const timelineDotDiameter = 20;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperLine: {
    height: timelineVerticalOffset,
    width: 0,
    borderWidth: 1,
  },
  timelineDot: {
    height: timelineDotDiameter,
    width: timelineDotDiameter,
    borderRadius: timelineDotDiameter / 2,
    backgroundColor: 'green',
    borderWidth: 2,
  },
  lowerLine: {
    width: 0,
    borderWidth: 1,
    flex: 1,
  },
  contentWrapper: {
    paddingTop: timelineVerticalOffset,
    paddingBottom: 10,
  },
  timeText: {
    height: timelineDotDiameter,
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  statusText: {
    fontStyle: 'italic',
  },
  surface: {
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
  },
  splitFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalSpacer: {
    width: 10,
  },
});