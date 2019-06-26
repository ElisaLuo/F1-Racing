import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

import CurrentSeason from './components/CurrentSeason';
import CurrentRaceInfo from './components/CurrentRaceInfo'
import DriversByYears from './components/Drivers/DriversByYears';
import RacesByYears from './components/Races/RacesByYears';
import ChampionshipPerYear from './components/Championships/ChampionshipPerYear';
import DriversPerYear from './components/Drivers/DriversPerYear';
import DriverInfo from './components/Drivers/DriverInfo';

const HomeStack = createStackNavigator(
  { 
    Home: CurrentSeason,
    CurrentRaceInfo: CurrentRaceInfo,
  },
  {
    initialRouteName: 'Home',
  }
);
const HomeContainer = createAppContainer(HomeStack);

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
const DriverContainer = createAppContainer(DriverStack);

const BottomNavigator = createMaterialBottomTabNavigator({
  Home: {
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
    screen: RacesByYears,
    navigationOptions:{
      tabBarLabel: "Past Races",
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="flag" />
        </View>
      )
    }
  },
  Championship: {
    screen: ChampionshipPerYear,
    navigationOptions:{
      tabBarLabel: "Championships",
      tabBarIcon: () =>(
        <View>
          <AntDesign style={[{color: "white"}]} size = {25} name="Trophy" />
        </View>
      )
    }
  }
}, {
  initialRouteName: "Home",  
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
