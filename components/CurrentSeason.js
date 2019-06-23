import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
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
        return(
          <View style={{flex: 1, paddingTop:20}}>
            <Text>{this.state.season} Race Year</Text>
              <FlatList
                data={this.state.races}
                renderItem={({item}) => 
                <Button
                  title={item.raceName}
                  onPresss={() => console.log("hello")}></Button>}
              />
          </View>
        );
      }
}
