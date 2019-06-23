import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import CurrentSeason from './components/CurrentSeason';
import CurrentRaceInfo from './components/CurrentRaceInfo'
import DriversByYears from './components/Drivers/DriversByYears';
import DriversPerYear from './components/Drivers/DriversPerYear';
import DriverInfo from './components/Drivers/DriverInfo';
import RacesByYears from './components/Races/RacesByYears';
import RacesPerYear from './components/Races/RacesPerYear';
import RaceInfo from './components/Races/RaceInfo';
import ChampionshipPerYear from './components/Championships/ChampionshipPerYear';
import ChampionshipInfo from './components/Championships/ChampionshipPerYear';

const MainNavigator = createBottomTabNavigator({
  Home: {screen: CurrentSeason},
  Driver: {screen: DriversByYears},
  Race: {screen: RacesByYears},
  Championship: {screen: ChampionshipPerYear}/* ,
  DriversPerYear: {screen: DriversPerYear},
  DriverInfo: {screen: DriverInfo},
  RacesByYears: {screen: RacesByYears},
  RacesPerYear: {screen: RacesPerYear},
  RaceInfo: {screen: RaceInfo},
  ChampionshipPerYear: {screen: ChampionshipPerYear},
  ChampionshipInfo: {screen: ChampionshipInfo} */
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
