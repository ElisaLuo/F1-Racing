import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight, ScrollView  } from 'react-native';
import { DataTable } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

export default class RaceQualifyingInfo extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            results: [],
            loading: true
        }
      }
      
      componentDidMount(){
        fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/circuits/${this.props.navigation.state.params.race}/qualifying.json`)
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log("hit")
            if(responseJson.MRData.RaceTable.Races[0] == undefined){
              this.setState({
                results: ["No Results"]
              }, function(){
                this.setState({
                  loading: false
                })
              });
            } else if(responseJson.MRData.RaceTable.Races[0].QualifyingResults !== undefined){
              this.setState({
                results: responseJson.MRData.RaceTable.Races[0].QualifyingResults
              }, function(){
                this.setState({
                  loading: false
                })
              });
            }
          })
          .catch((error) =>{
            console.error("Error" + error);
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
          if(this.state.results[0] == "No Results"){
            return(
              <View style={{ flex: 1 }}>
                <Text>Sorry, no results found</Text>
              </View>
            )
          }
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
                    <DataTable.Title>Q1</DataTable.Title>
                    <DataTable.Title>Q2</DataTable.Title>
                    <DataTable.Title>Q3</DataTable.Title>
                  </DataTable.Header>
                  {this.state.results.map((items, index)=>
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{items.position}</DataTable.Cell>
                      <DataTable.Cell>{items.Driver.familyName}</DataTable.Cell>
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
