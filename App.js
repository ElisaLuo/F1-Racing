import React from 'react';
import { Button, View, Text } from 'react-native';
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
  Home:{
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
      backgroundColor: '#F71C01' 
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
      backgroundColor: '#F71C01' 
    }, indicatorStyle: {
    backgroundColor: 'white',
    }
  }
});

const CurrentTop = createAppContainer(CurrentTopNavigator);
const RaceTop = createAppContainer(RaceTopNavigator);

const HomeStack = createStackNavigator(
  { 
    Home: CurrentSeason,
    CurrentInfo: CurrentTop,
  },
  {
    initialRouteName: 'Home',
  }
);
const DriverStack = createStackNavigator(
  { 
    Home: DriversByYears,
    DriversPerYear: DriversPerYear,
    DriverInfo: DriverInfo
  },
  {
    initialRouteName: 'Home',
  }
);
const RaceStack = createStackNavigator(
  { 
    Home: RacesByYears,
    RacesPerYear: RacesPerYear,
    RaceInfo: RaceTop
  },
  {
    initialRouteName: 'Home',
  }
);
const ConstructorStack = createStackNavigator(
  { 
    Home: ConstructorsByYear,
    ConstructorsPerYear: ConstructorsPerYear,
    ConstructorInfo: ConstructorInfo
  },
  {
    initialRouteName: 'Home',
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
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="home" />
        </View>
      )
    }
  },
  Driver: {
    screen: DriverContainer,
    navigationOptions:{
      tabBarLabel: "Drivers",
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="user" />
        </View>
      )
    }
  },
  Race: {
    screen: RaceContainer,
    navigationOptions:{
      tabBarLabel: "Past Races",
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="flag" />
        </View>
      )
    }
  },
  Constructor: {
    screen: ConstructorContainer,
    navigationOptions:{
      tabBarLabel: "Constructors",
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="Trophy" />
        </View>
      )
    }
  }
}, {
  initialRouteName: "Current",  
  activeColor: '#f0edf6',  
  barStyle: { backgroundColor: '#F71C01' }, 
});

const Bottom = createAppContainer(BottomNavigator);

export default class App extends React.Component {

  render() {
    return(
        <Bottom />
    );
  }
}
