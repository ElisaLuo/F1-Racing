import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TouchableHighlight, StyleSheet  } from 'react-native';


export default class ConstructorsByYear extends React.Component {
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
                onPress={() => this.props.navigation.navigate('ConstructorsPerYear', {year: item.season})}>
                  <Text style={styles.item}>{item.season}</Text>  
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