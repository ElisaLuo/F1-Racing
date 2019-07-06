import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight, ScrollView  } from 'react-native';
import { DataTable } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

export default class CurrentRaceInfo extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        results: [],
        loading: true
    }
  }
  
  componentDidMount(){
    //console.log(this.props);
    fetch(`https://ergast.com/api/f1/current/circuits/${this.props.navigation.state.params.race}/results.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson.MRData.RaceTable.Races[0].Results[0].Time.time);
        if(responseJson.MRData.RaceTable.Races[0] == undefined){
          this.setState({
            results: ["No Results"]
          }, function(){
            this.setState({
              loading: false
            })
          });
        } else if(responseJson.MRData.RaceTable.Races[0].Results !== undefined){
          this.setState({
            results: responseJson.MRData.RaceTable.Races[0].Results
          }, function(){
            this.setState({
              loading: false
            })
          });
        }
      })
      .catch((error) =>{
        console.error(error);
      });
      
  }
    render() {
      this.state.results.map(items=>{
        if(items.status == "Finished"){
          items.status = items.Time.time;
        } else if(items.status !== "Finished"){
          items.status = items.status;
        }
      })
      if(this.state.results[0] == "No Results"){
        return(
          <View style={{ flex: 1, textAlign: 'center' }}>
            <Text>Sorry, the race has not started yet</Text>
          </View>
        )
      }
      //console.log(this.state.results[0])
      return (
        <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.loading}
        />
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>POS</DataTable.Title>
                <DataTable.Title>DRIVER</DataTable.Title>
                <DataTable.Title>TIME/RET</DataTable.Title>
                <DataTable.Title>PTS</DataTable.Title>
              </DataTable.Header>
              {this.state.results.map((items, index)=>
                <DataTable.Row key={index}>
                  <DataTable.Cell>{items.position}</DataTable.Cell>
                  <DataTable.Cell>{items.Driver.familyName}</DataTable.Cell>
                  <DataTable.Cell>{items.status}</DataTable.Cell>
                  <DataTable.Cell>{items.points}</DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          </ScrollView>
        </View>
      )
    }
    
}
