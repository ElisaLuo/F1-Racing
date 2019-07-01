import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
        this.state.races.map(item=>{
          var name = item.raceName.split(" ");
          name.pop();
          name.pop();
          item.Circuit.url = name.join(" ");
        })
        return(
          <View>
              <FlatList
                data={this.state.races}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item}) => 
                <TouchableHighlight
                 onPress={() => this.props.navigation.navigate('CurrentInfo', {race: item.Circuit.circuitId, circuit: item.Circuit.url, year: item.season})}>
                 <View style={styles.container}>
                  <Text style={styles.item}>{item.raceName}</Text>
                  <Text style={{color: "grey", marginBottom: -25}}>{item.date} {item.time}</Text>
                  <AntDesign style={styles.icon} size = {25} name="right" />
                  <Text style={{color: "grey"}}>{item.Circuit.circuitName}, {item.Circuit.Location.locality}, {item.Circuit.Location.country}</Text>
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
   paddingTop: 15,
   padding: 20,
  },
  item: {
    fontSize: 20,
    fontFamily: "f1Font",
  },
  icon:{
    color: "#F71C01",
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
})