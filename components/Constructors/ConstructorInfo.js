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
          <View style={{flex: 1, margin: 30}}>
            <View style={{flexDirection:"row", marginTop: 20}}>
              <View style={styles.container}>
                <Text style={styles.title}>Position</Text>
                <Text style={styles.item}>{this.props.navigation.state.params.position}</Text>
              </View>
              <View style={styles.containerRight}>
                <Text style={styles.title}>Points</Text>
                <Text style={styles.item}>{this.props.navigation.state.params.points}</Text>
              </View>
            </View>
            <View style={{flexDirection:"row"}}>
              <View style={styles.container}>
                <Text style={styles.title}>Total Wins</Text>
                <Text style={styles.item}>{this.props.navigation.state.params.wins}</Text>
              </View>
              <View style={styles.containerRight}>
                <Text style={styles.title}>Drivers</Text>
                <View style={styles.item}>
                <FlatList
                  data={this.state.drivers}
                  keyExtractor={(item, index) => 'key'+index}
                  renderItem={({item}) => 
                    <Text style={{fontSize: 17}}>{item.givenName} {item.familyName}</Text>
                  }
                />
                </View>
              </View>
            </View>
          </View>
        );
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
    fontSize: 20,
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