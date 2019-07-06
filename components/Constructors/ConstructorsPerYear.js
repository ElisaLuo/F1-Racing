import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';


export default class ConstructorsPerYear extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        constructors: [],
        loading: true
    }
  }
  
  componentDidMount(){
    //console.log(this.props)
    fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/constructorStandings.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          constructors: responseJson.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        }, function(){
          this.setState({
            loading: false
          })
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <View style={{ flex: 1 }}>
          <Spinner
            visible={this.state.loading}
          />
          <FlatList
            data={this.state.constructors}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <TouchableHighlight
            onPress={() => this.props.navigation.navigate('ConstructorInfo', {
              constructor: item.Constructor.constructorId, 
              year: this.props.navigation.state.params.year, 
              constructorName: item.Constructor.name,
              position: item.position, 
              points: item.points, 
              wins: item.wins})}>
              <View style={styles.container}>
                <Text style={styles.item}>{item.Constructor.name}</Text>
                <AntDesign style={styles.icon} size = {25} name="right" />
              </View>
            </TouchableHighlight>
            }
          />
        </View>
      )
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