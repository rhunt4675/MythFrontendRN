import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator, 
  createDrawerNavigator,
} from 'react-navigation';
import Settings from './storage/Settings';

import { TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import TitleScreen from './screens/recordings/TitleScreen';
import RecordedScreen from './screens/recordings/RecordedScreen';
import RecordedDetailScreen from './screens/recordings/RecordedDetailScreen';
import RecentScreen from './screens/recent/RecentScreen';
import UpcomingScreen from './screens/upcoming/UpcomingScreen';
import StatusScreen from './screens/status/StatusScreen';
import RuleScreen from './screens/rules/RuleScreen';
import RuleDetailScreen from './screens/rules/RuleDetailScreen';
import RuleEditScreen from './screens/rules/RuleEditScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendAddr: undefined,
    }

    this._loadBackendAddr();
    this._onBackendAddrChanged = this._onBackendAddrChanged.bind(this);
  }

  _loadBackendAddr() {
    Settings.getBackendAddr()
      .then(addr => this.setState({
        backendAddr: addr,
      })
    );
  }

  _onBackendAddrChanged(newAddr) {
    Settings.setBackendAddr(newAddr)
      .then(() => this.setState({
        backendAddr: newAddr,
      })
    );
  }

  render() {
    const navigationHamburger = ({ navigation }, extras = {}) => ({
      headerLeft:
        <TouchableRipple
            borderless
            rippleColor='rgba(0, 0, 0, .32)'
            underlayColor='rgba(0, 0, 0, .32)'
            onPress={() => requestAnimationFrame(() => navigation.toggleDrawer())}>
          <MaterialIcons name="menu" size={25} />
        </TouchableRipple>,
      headerLeftContainerStyle: {
        margin: 13
      },
      ...extras,
    });

    const RecordingStack = createStackNavigator({
      Title: {
        screen: TitleScreen,
        navigationOptions: navigationHamburger,
      },
      Recorded: RecordedScreen,
      Detail: RecordedDetailScreen,
    });
    
    const RecentStack = createStackNavigator({
      Recent: {
        screen: RecentScreen,
        navigationOptions: navigationHamburger,
      },
      Detail: RecordedDetailScreen,
    });

    const UpcomingStack = createStackNavigator({
      Upcoming: {
        screen: UpcomingScreen,
        navigationOptions: navigationHamburger,
      },
    });

    const RuleStack = createStackNavigator({
      Rule: {
        screen: RuleScreen,
        navigationOptions: navigationHamburger,
      },
      RuleDetail: RuleDetailScreen,
      RuleEdit: RuleEditScreen,
    });

    const StatusStack = createStackNavigator({
      Status: {
        screen: StatusScreen,
        navigationOptions: navigationHamburger,
      },
    });
    
    const SettingsStack = createStackNavigator({
      Settings: {
        screen: props => <SettingsScreen {...props} onBackendAddrChanged={this._onBackendAddrChanged} />,
        navigationOptions: config => navigationHamburger(config, extras = {title: 'Settings'}),
      },
    });

    const DrawerNavigator = createDrawerNavigator({
      'Recordings': RecordingStack,
      'Recent Recordings': RecentStack,
      'Upcoming Recordings': UpcomingStack,
      'Recording Rules': RuleStack,
      'Backend Status': StatusStack,
      'Settings': SettingsStack,
    },{
      drawerType: 'slide',
      backBehavior: false,
    });
    const AppContainer = createAppContainer(DrawerNavigator);

    return <AppContainer screenProps={{...this.state}} />;
  }
}
