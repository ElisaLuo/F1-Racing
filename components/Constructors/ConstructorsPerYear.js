import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';


export default class Championship extends React.Component {
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
          <View style={{flex: 1, paddingTop:20}}>
              <FlatList
                data={this.state.season.reverse()}
                renderItem={({item}) => 
                <Button
                  title={item.season}
                  onPresss={() => console.log("hello")}></Button>}
              />
          </View>
        );
      }
}
