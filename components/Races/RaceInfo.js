import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';


export default class RaceInfo extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        rankings: [],
        race: ""
    }
  }

  componentDidMount(){
    return fetch('http://ergast.com/api/f1/2019/1/results.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          rankings: responseJson.MRData.RaceTable.Races[0].Results,
          race: responseJson.MRData.RaceTable.Races[0].season + " " + responseJson.MRData.RaceTable.Races[0].raceName
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Text>{this.state.race}</Text>
        <FlatList
          data={this.state.rankings}
          renderItem={({item}) => <Text>{item.position}. {item.Driver.givenName} {item.Driver.familyName}</Text>}
        />
      </View>
    );
  }
}
