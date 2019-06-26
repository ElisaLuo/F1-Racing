import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet  } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


export default class CurrentRaceInfo extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        results: []
    }
  }
  
  componentDidMount(){
    fetch(`https://ergast.com/api/f1/current/circuits/${this.props.navigation.state.params.race}/results.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson.MRData.RaceTable.Races[0].Results[0].Time.time);
        this.setState({
          results: responseJson.MRData.RaceTable.Races[0].Results
        }, function(){});
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
      console.log(this.state.results[0])
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.item}>POS DRIVER TIME/RET PTS</Text>
          <Table>
          </Table>
        </View>
      )
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

/* <Text style={styles.item}>POS DRIVER TIME/RET PTS</Text>
          <FlatList
              data={this.state.results}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={({item}) => 
              <View>
                <Text style={styles.item}>{item.position} {item.Driver.code} {item.status} {item.points}</Text>
              </View>
              }
            />
            { more about the circuit, fastest lap } */