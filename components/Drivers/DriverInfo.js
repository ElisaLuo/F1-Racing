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
        position: "",
        points: "",
        wins: ""
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
          position: responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position,
          points: responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points,
          wins: responseJson.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <View style={{flex: 1, margin: 30}}>
          <FlatList
            data={this.state.basicInfo}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <View>
              <View style={{flexDirection:"row", marginTop: 10}}>
              <View style={styles.container}>
                  <Text style={styles.title}>Driver Code</Text>
                  <Text style={styles.item}>{item.code}</Text>
                </View>
                <View style={styles.containerRight}>
                  <Text style={styles.title}>Number</Text>
                  <Text style={styles.item}>{item.permanentNumber}</Text>
                </View>
              </View>
              <View style={{flexDirection:"row", marginTop: 10}}>
                <View style={styles.container}>
                  <Text style={styles.title}>Birth Date</Text>
                  <Text style={styles.item}>{item.dateOfBirth}</Text>
                </View>
                <View style={styles.containerRight}>
                  <Text style={styles.title}>Nationality</Text>
                  <Text style={styles.item}>{item.nationality}</Text>
                </View>
              </View>
            </View>
            }
          />
          <View style={{flexDirection:"row", marginTop: -120}}>
            <View style={styles.container}>
              <Text style={styles.title}>Constructor</Text>
              <Text style={styles.item}>{this.state.constructor}</Text>
            </View>
            <View style={styles.containerRight}>
              <Text style={styles.title}>Position</Text>
              <Text style={styles.item}>{this.state.position}</Text>
            </View>
          </View>
          <View style={{flexDirection:"row"}}>
            <View style={styles.container}>
              <Text style={styles.title}>Points</Text>
              <Text style={styles.item}>{this.state.points}</Text>
            </View>
            <View style={styles.containerRight}>
              <Text style={styles.title}>Wins</Text>
              <Text style={styles.item}>{this.state.wins}</Text>
            </View>
          </View>
        </View>
      )
    }
    
}

const styles = StyleSheet.create({
  containerRight: {
   width: 155,
   marginLeft: 20
  },
  container: {
    width: 155
  },
  title: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontFamily: "f1Font",
    borderBottomColor: '#F71C01',
    borderBottomWidth: 3,
    borderRightColor: '#F71C01',
    borderRightWidth: 3,
    borderRadius: 7
  },
  item: {
    padding: 20,
    fontSize: 20
  },
})