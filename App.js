import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator  } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

import CurrentSeason from './components/CurrentSeason';
import CurrentRaceInfo from './components/CurrentRaceInfo'
import CurrentQualifyingInfo from './components/CurrentQualifyingInfo';
import DriversByYears from './components/Drivers/DriversByYears';
import RacesByYears from './components/Races/RacesByYears';
import ConstructorsPerYear from './components/Constructors/ConstructorsPerYear';
import DriversPerYear from './components/Drivers/DriversPerYear';
import DriverInfo from './components/Drivers/DriverInfo';
import RacesPerYear from './components/Races/RacesPerYear';
import RaceInfo from './components/Races/RaceInfo';
import ConstructorInfo from './components/Constructors/ConstructorInfo';
import RaceQualifyingInfo from './components/Races/RaceQualifyingInfo';
import ConstructorsByYear from './components/Constructors/ConstructorsByYear';

const CurrentTopNavigator = createMaterialTopTabNavigator({
  CurrentRaceInfo:{
    screen: CurrentRaceInfo,
    navigationOptions:{
      tabBarLabel: "Race"
    }
  },
  Qualifying:{
    screen: CurrentQualifyingInfo,
    navigationOptions:{
      tabBarLabel: "Qualifying"
    }
  }
}, { 
  tabBarOptions: { 
    style:{ 
      backgroundColor: '#F71C01',
      elevation: 0,
      shadowOpacity: 0
    }, indicatorStyle: {
    backgroundColor: 'white',
    }
  }
});
const RaceTopNavigator = createMaterialTopTabNavigator({
  Home:{
    screen: RaceInfo,
    navigationOptions:{
      tabBarLabel: "Race"
    }
  },
  Qualifying:{
    screen: RaceQualifyingInfo,
    navigationOptions:{
      tabBarLabel: "Qualifying"
    }
  }
}, { 
  tabBarOptions: { 
    style:{ 
      backgroundColor: '#F71C01',
      elevation: 0,
      shadowOpacity: 0
    }, indicatorStyle: {
    backgroundColor: 'white',
    }
  }
});

const CurrentTop = createAppContainer(CurrentTopNavigator);
const RaceTop = createAppContainer(RaceTopNavigator);

const HomeStack = createStackNavigator(
  { 
    CurrentSeason: {
      screen: CurrentSeason,
      navigationOptions: () =>({
        headerTitle: (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={require('./assets/f1logo.png')} style={{ width: 90, height: 39 }}/>
          </View>
        )
      })
    }, 
    CurrentInfo: {
      screen: CurrentTop,
      navigationOptions: ({navigation}) =>({
        title:  navigation.getParam('year', 'Error')  + " " + navigation.getParam('circuit', 'Error') + " GP",
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    },
  },
  {
    initialRouteName: 'CurrentSeason',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F71C01',
        headerTintColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }, 
  }
);
const DriverStack = createStackNavigator(
  { 
    DriversByYears: {
      screen: DriversByYears,
      navigationOptions: () =>({
        headerTitle: (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={require('./assets/f1logo.png')} style={{ width: 90, height: 39 }}/>
          </View>
        )
      })
    },
    DriversPerYear: {
      screen: DriversPerYear,
      navigationOptions: ({navigation}) =>({
        title:  navigation.getParam('year', 'Error'),
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    },
    DriverInfo: {
      screen: DriverInfo,
      navigationOptions: ({navigation}) =>({
        title:  navigation.getParam('name', 'Error'),
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    }
  },
  {
    initialRouteName: 'DriversByYears',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F71C01',
        headerTintColor: "white"
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const RaceStack = createStackNavigator(
  { 
    RacesByYears: {
      screen: RacesByYears,
      navigationOptions: () =>({
        headerTitle: (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={require('./assets/f1logo.png')} style={{ width: 90, height: 39 }}/>
          </View>
        )
      })
    },
    RacesPerYear: {
      screen: RacesPerYear,
      navigationOptions: ({navigation}) =>({
        title: navigation.getParam('year', 'A Nested Details Screen'),
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    },
    RaceInfo: {
      screen: RaceTop,
      navigationOptions: ({navigation}) =>({
        title: navigation.getParam('year', 'Error')  + " " + navigation.getParam('circuit', 'Error') + " GP",
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    }
  },
  {
    initialRouteName: 'RacesByYears',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F71C01',
        headerTintColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }, 
  }
);
const ConstructorStack = createStackNavigator(
  { 
    ConstructorsByYear: {
      screen: ConstructorsByYear,
      navigationOptions: () =>({
        headerTitle: (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={require('./assets/f1logo.png')} style={{ width: 90, height: 39 }}/>
          </View>
        )
      })
    },
    ConstructorsPerYear: {
      screen: ConstructorsPerYear,
      navigationOptions: ({navigation}) =>({
        title: navigation.getParam('year', 'Error'),
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    },
    ConstructorInfo: {
      screen: ConstructorInfo,
      navigationOptions: ({navigation}) =>({
        title: navigation.getParam('year', 'Error') + " " + navigation.getParam('constructorName', 'Error'),
        headerTitleStyle:{
          fontFamily: "f1Font",
          fontWeight: '200',
        },
        headerTintColor: "white"
      })
    }
  },
  {
    initialRouteName: 'ConstructorsByYear',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F71C01',
        headerTintColor: "white"
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


const HomeContainer = createAppContainer(HomeStack);
const DriverContainer = createAppContainer(DriverStack);
const RaceContainer = createAppContainer(RaceStack);
const ConstructorContainer = createAppContainer(ConstructorStack);

const BottomNavigator = createMaterialBottomTabNavigator({
  Current: {
    screen: HomeContainer,
    navigationOptions:{
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) =>(
        <View>
          <AntDesign style={[{color: tintColor}]} size = {25} name="home" />
        </View>
      ),
      activeColor: "#F71C01"
    }
  },
  Driver: {
    screen: DriverContainer,
    navigationOptions:{
      tabBarLabel: "Drivers",
      tabBarIcon: ({tintColor}) =>(
        <View>
          <AntDesign style={[{color: tintColor}]} size = {25} name="user" />
        </View>
      ),
      activeColor: "#F71C01"
    }
  },
  Race: {
    screen: RaceContainer,
    navigationOptions:{
      tabBarLabel: "Past Races",
      tabBarIcon: ({tintColor}) =>(
        <View>
          <AntDesign style={[{color: tintColor}]} size = {25} name="flag" />
        </View>
      ),
      activeColor: "#F71C01"
    }
  },
  Constructor: {
    screen: ConstructorContainer,
    navigationOptions:{
      tabBarLabel: "Constructors",
      tabBarIcon: ({tintColor}) =>(
        <View>
          <AntDesign style={[{color: tintColor}]} size = {25} name="Trophy" />
        </View>
      ),
      activeColor: "#F71C01"
    }
  }
}, {
  initialRouteName: "Current",  
  activeColor: '#F71C01',  
  barStyle: { backgroundColor: 'white' }, 
});

const Bottom = createAppContainer(BottomNavigator);

export default class App extends React.Component {
  
  render() {
    return(
        <Bottom />
    );
  }
}