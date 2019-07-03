import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight, StyleSheet  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class DriversByYears extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            season: []
        }
      }

      componentDidMount(){
        return fetch('http://ergast.com/api/f1/seasons.json?limit=100')
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson.MRData.RaceTable.Races);
            this.setState({
              season: responseJson.MRData.SeasonTable.Seasons
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
              <FlatList
                data={this.state.season.reverse()}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item}) => 
                <TouchableHighlight
                onPress={() => this.props.navigation.navigate('DriversPerYear', {year: item.season})}>
                  <View style={styles.container}>
                   <Text style={styles.item}>{item.season} Season</Text>  
                    <AntDesign style={styles.icon} size = {25} name="right" />
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
   padding: 20,
   paddingTop: 15
  },
  item: {
    fontSize: 20,
    fontFamily: "f1Font",
    marginBottom: -25
  },
  icon:{
    color: "#F71C01",
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
})