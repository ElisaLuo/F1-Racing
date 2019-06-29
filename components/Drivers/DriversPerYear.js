import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { DataTable } from 'react-native-paper';


export default class DriversPerYear extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        drivers: []
    }
  }
  
  componentDidMount(){
    //console.log(this.props)
    fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/driverStandings.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          drivers: responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings
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
            data={this.state.drivers}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <TouchableHighlight
            onPress={() => this.props.navigation.navigate('DriverInfo', {driver: item.Driver.driverId, year: this.props.navigation.state.params.year, position: item.position})}>
              <Text style={styles.item}>{item.position} {item.Driver.givenName} {item.Driver.familyName}</Text>
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