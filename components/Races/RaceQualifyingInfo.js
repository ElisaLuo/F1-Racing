import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight, ScrollView  } from 'react-native';
import { DataTable } from 'react-native-paper';

export default class RaceQualifyingInfo extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            results: []
        }
      }
      
      componentDidMount(){
        //console.log(this.props);
        fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/circuits/${this.props.navigation.state.params.race}/qualifying.json`)
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson.MRData.RaceTable.Races[0].Results[0].Time.time);
            this.setState({
              results: responseJson.MRData.RaceTable.Races[0].QualifyingResults
            }, function(){});
          })
          .catch((error) =>{
            console.error(error);
          });
      }
        render() {
          this.state.results.map(items=>{
            if(items.Q3 == undefined){
              items.Q3 = "--";
            }
            if(items.Q2 == undefined){
              items.Q2 = "--";
            } 
            if(items.Q1 == undefined){
              items.Q1 = "--";
            }
          })
          //console.log(this.state.results[0])
          return (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>POS</DataTable.Title>
                    <DataTable.Title>DRIVER</DataTable.Title>
                    <DataTable.Title>Q1</DataTable.Title>
                    <DataTable.Title>Q2</DataTable.Title>
                    <DataTable.Title>Q3</DataTable.Title>
                  </DataTable.Header>
                  {this.state.results.map(items=>
                    <DataTable.Row>
                      <DataTable.Cell>{items.position}</DataTable.Cell>
                      <DataTable.Cell>{items.Driver.code}</DataTable.Cell>
                      <DataTable.Cell>{items.Q1}</DataTable.Cell>
                      <DataTable.Cell>{items.Q2}</DataTable.Cell>
                      <DataTable.Cell>{items.Q3}</DataTable.Cell>
                    </DataTable.Row>
                  )}
                </DataTable>
              </ScrollView>
            </View>
          )
        }
}
