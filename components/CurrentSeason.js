/* import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight  } from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import CurrentRaceInfo from './CurrentRaceInfo';
import {Font} from 'expo';

export default class CurrentSeason extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            season: "",
            races: []
        }
      }

      componentDidMount(){
        Font.loadAsync({
          "f1Font": require('../assets/fonts/Formula1-Regular.ttf'),
        })
        
        return fetch('https://ergast.com/api/f1/current.json')
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson.MRData.RaceTable.Races);
            this.setState({
              season: responseJson.MRData.RaceTable.season,
              races: responseJson.MRData.RaceTable.Races
            }, function(){
            });
          })
          .catch((error) =>{
            console.error(error);
          });
      }
      render(){
        const {navigate} = this.props.navigation;
        return(
          <View>
              <FlatList
                data={this.state.races}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item}) => 
                <TouchableHighlight
                 onPress={() => this.props.navigation.navigate('CurrentInfo', {race: item.Circuit.circuitId})}>
                 <View style={styles.container}>
                  <Text style={styles.item}>{item.raceName}</Text>
                  <Text style={{fontFamily: "f1Font"}}>{item.date}</Text>
                 </View>
                </TouchableHighlight>
                }
              />
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontFamily: "f1Font"
  }
}) */

import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight  } from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import * as Font from 'expo-font';

export default class CurrentSeason extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            season: "",
            races: []
        }
      }

      componentDidMount(){
        Font.loadAsync({
          "f1Font": require('../assets/fonts/Formula1-Regular.ttf'),
        })

        return fetch('https://ergast.com/api/f1/current.json')
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson.MRData.RaceTable.Races);
            this.setState({
              season: responseJson.MRData.RaceTable.season,
              races: responseJson.MRData.RaceTable.Races
            }, function(){
            });
          })
          .catch((error) =>{
            console.error(error);
          });
      }
      render(){
        const {navigate} = this.props.navigation;
        return(
          <View>
              <FlatList
                data={this.state.races}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item}) => 
                <TouchableHighlight
                 onPress={() => this.props.navigation.navigate('CurrentInfo', {race: item.Circuit.circuitId})}>
                 <View style={styles.container}>
                  <Text style={styles.item}>{item.raceName}</Text>
                  <Text style={styles.item}>{item.date}</Text>
                 </View>
                </TouchableHighlight>
                }
              />
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontFamily: "f1Font"
  },
})