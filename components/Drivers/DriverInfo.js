import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Item } from 'native-base';


export default class DriverInfo extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        basicInfo: [],
        constructor: "",
        rank: []
    }
  }
  
  componentDidMount(){
    //console.log(this.props)
    fetch(`http://ergast.com/api/f1/drivers/${this.props.navigation.state.params.driver}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          basicInfo: responseJson.MRData.DriverTable.Drivers,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });

      fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/drivers/${this.props.navigation.state.params.driver}/constructors.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          constructor: responseJson.MRData.ConstructorTable.Constructors[0].name
        }, function(){
          console.log(this.state.constructor);
        });
      })
      .catch((error) =>{
        console.error(error);
      });

      fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/driverStandings/${this.props.navigation.state.params.position}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(this.state.constructor);
        this.setState({
          rank: responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings
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
            data={this.state.basicInfo}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <View>
              <Text>Name: {item.givenName} {item.familyName}</Text>
              <Text style={styles.item}>Permanent Number: {item.permanentNumber}</Text>
              <Text>Driver Code: {item.code}</Text>
              <Text>Nationality: {item.nationality}</Text>
              <Text>Date of Birth: {item.dateOfBirth}</Text>
            </View>
            }
          />
          <Text>Constructor: {this.state.constructor}</Text>
          <FlatList
            data={this.state.rank}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <View>
              <Text>{item.position} {item.points} {item.wins}</Text>
            </View>
              
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