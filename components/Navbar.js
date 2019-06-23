import React from 'react';
import { Button, FlatList, ActivityIndicator, Text, View  } from 'react-native';

class Navbar extends React.Component {

    constructor(props){
        super(props);
    }
    
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button
                    title="Drivers"
                    onPress={() => navigate('DriversByYears')}
                />
            </View>
        );
    }
}

export default Navbar;