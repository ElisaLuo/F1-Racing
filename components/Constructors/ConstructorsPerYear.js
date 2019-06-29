import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight  } from 'react-native';
import { DataTable } from 'react-native-paper';


export default class ConstructorsPerYear extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
        constructors: []
    }
  }
  
  componentDidMount(){
    //console.log(this.props)
    fetch(`https://ergast.com/api/f1/${this.props.navigation.state.params.year}/constructorStandings.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          constructors: responseJson.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.constructors}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => 
            <TouchableHighlight
            onPress={() => this.props.navigation.navigate('ConstructorInfo')}>
              <Text style={styles.item}>{item.poistion} {item.Constructor.name}</Text>
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
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})