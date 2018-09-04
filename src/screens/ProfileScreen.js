import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, FormLabel, FormInput, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {Constants} from 'expo';
import {setProfileData} from '../actions/profileActions';
/**
 *
 *
 * @class ProfileScreen
 * @extends {React.Component}
 */
class ProfileScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Settings',
        };
    };

    state = {
        deviceId: '',
        phoneNumber: '',
        name: ''
    };

    componentDidMount() {
        const deviceId = Constants.deviceId;
        
        const {profile} = this.props;

        console.log('mounted component with profile: ', profile);

        this.setState({deviceId, phoneNumber: profile.phoneNumber, name: profile.name}, () => {
            console.log('state updated: ', this.state);
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('received new props: ', nextProps);
    }

    _onPressUpdateProfile = () => {
        console.log('dispatch update profile action');

        const {deviceId, phoneNumber, name} = this.state;

        this.props.setProfileData({deviceId, phoneNumber, name});
        this.props.navigation.pop();
    };

    render() {

        const {profile} = this.props;

        console.log('render with profile: ', profile);

        return (
            <ScrollView style={styles.containerStyle} >
                <Card>
                    <FormLabel>Device Id</FormLabel>
                    <FormLabel>{profile.deviceId}</FormLabel>
                    
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormInput 
                        keyboardType="phone-pad"
                        placeholder="876-555-1234"
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        value={this.state.phoneNumber}
                    />

                    <FormLabel>Name (Optional)</FormLabel>
                    <FormInput 
                        autoCorrect={false}
                        placeholder="John Doe"
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                    />

                    <Button 
                        icon={{name: 'check-circle'}}
                        onPress={this._onPressUpdateProfile}
                        title="Update Information"
                    />
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    }
};

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

const mappedActions = {
    setProfileData
};

export default connect(mapStateToProps, mappedActions)(ProfileScreen);