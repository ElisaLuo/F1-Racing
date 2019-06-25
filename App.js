import React from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import CurrentSeason from './components/CurrentSeason';
import CurrentRaceInfo from './components/CurrentRaceInfo'
import DriversByYears from './components/Drivers/DriversByYears';
import RacesByYears from './components/Races/RacesByYears';
import ChampionshipPerYear from './components/Championships/ChampionshipPerYear';

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

const BottomNavigator = createBottomTabNavigator({
  Home: {screen: HomeContainer},
  Driver: {screen: DriversByYears},
  Race: {screen: RacesByYears},
  Championship: {screen: ChampionshipPerYear}
});

const Bottom = createAppContainer(BottomNavigator);


export default class App extends React.Component {

  render() {
    return(
        <Bottom />
    );
  }
}
