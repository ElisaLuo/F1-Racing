import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { DataTable } from 'react-native-paper';


export default class RacesPerYear extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        races: []
    }
  }
  
  componentDidMount(){
    //console.log(this.props)
    fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson.MRData.RaceTable.Races);
        this.setState({
          races: responseJson.MRData.RaceTable.Races
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.races}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <TouchableHighlight
            onPress={() => this.props.navigation.navigate('RaceInfo', {race: item.Circuit.circuitId, year: item.season})}>
              <Text style={styles.item}>{item.raceName} {item.date}</Text>
            </TouchableHighlight>
            }
          />
        </View>
      )
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