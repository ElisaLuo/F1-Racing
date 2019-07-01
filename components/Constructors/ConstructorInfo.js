import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight, StyleSheet  } from 'react-native';


export default class ConstructorInfo extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            drivers: []
        }
      }

      componentDidMount(){

          fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/constructors/${this.props.navigation.state.params.constructor}/drivers.json`)
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson.MRData.RaceTable.Races);
            this.setState({
              drivers: responseJson.MRData.DriverTable.Drivers
            }, function(){
            });
          })
          .catch((error) =>{
            console.error(error);
          });
      }
      render(){
        return(
          <View style={{flex: 1}}>
              <Text style={styles.item}> position: {this.props.navigation.state.params.position} {this.props.navigation.state.params.constructorName}</Text>
              <Text style={styles.item}>points: {this.props.navigation.state.params.points}</Text>
              <Text style={styles.item}>wins: {this.props.navigation.state.params.wins}</Text>

              <FlatList
                data={this.state.drivers}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item}) => 
                <TouchableHighlight>
                  <Text style={styles.item}>{item.givenName} {item.familyName}</Text>
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