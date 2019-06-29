import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight  } from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
import CurrentRaceInfo from './CurrentRaceInfo';

export default class CurrentSeason extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            season: "",
            races: []
        }
      }

      componentDidMount(){
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
                 <Text style={styles.item}>{item.raceName} {item.date}</Text>
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
  },
})