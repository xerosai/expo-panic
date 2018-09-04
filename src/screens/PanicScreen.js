import React from 'react';
import {Animated, Platform, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {Constants, Location, Permissions} from 'expo';
import {connect} from 'react-redux';

const LOC_TIME_INTERVAL = 3000;
const ORANGE_COLOR = '#E7402A';
const NORMAL_COLOR = '#489A3E';
const ANIMATION_TIME = 1200;

/**
 *
 *
 * @class PanicScreen
 * @extends {React.Component}
 * @description Panic Button Screen
 */
class PanicScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Panic Button',
            headerRight: (
                <Button
                    icon={{name: 'account-box'}}
                    onPress={navigation.getParam('onPressProfileButton')}
                    small
                    title="Profile"
                />
            )
        }
    };

    state = {
        error: undefined,
        isSendingLocation: false,
        location: undefined,
        lastSent: undefined,
        locationWatcher: undefined,
    };

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.props.navigation.setParams({'onPressProfileButton': this._onPressProfileButton});
    }

    _onPressProfileButton = () => {
        this.props.navigation.navigate('ProfileScreen');
    };

    _requestLocationAndUpdates = () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                error: 'Location functionality is only available on actual devices.'
            });
        } else {
            this._startUpdatingLocation();
        }
    };

    _startUpdatingLocation = async () => {

        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            
            this.setState({
                error: 'Access to device location has not been granted'
            });
            
            return;
        }

        Animated.timing(this.animatedValue, {
            toValue: 150,
            duration: ANIMATION_TIME
        }).start();

        let locationWatcher = await Location.watchPositionAsync({
            distanceInterval: 0.5,
            enableHighAccurace: true,
            timeInterval: LOC_TIME_INTERVAL
        }, location => {
            this._onLocationUpdated(location);
        });

        this.setState({isSendingLocation: true, locationWatcher});
    };

    _stopUpdatingLocation = () => {
        if (!this.state.locationWatcher) return;

        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: ANIMATION_TIME
        }).start();

        this.state.locationWatcher.remove();
        this.setState({isSendingLocation: false, locationWatcher: undefined, location: undefined});
    };

    _onLocationUpdated = location => {

        this.setState({location});

        const deviceId = Constants.deviceId;

        const {profile} = this.props;

        const payload = {
            deviceId,
            phoneNumber: profile.phoneNumber,
            name: profile.name,
            location
        };

        console.log('send to server with payload: ', payload);
    };

    render () {
        
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: [NORMAL_COLOR, ORANGE_COLOR]
        });

        const animatedStyle = {
            backgroundColor: interpolateColor
        };

        const {error, isSendingLocation, location} = this.state;

        return (
            <View style={styles.containerStyle}>
                <Animated.View
                    
                    style={[{flex: 1, justifyContent: 'center'}, animatedStyle]}
                >
                    <View style={styles.controlContainerStyle}>
                        <Icon 
                            color={isSendingLocation ? '#38C76A' : '#E7402A'}
                            name={isSendingLocation ? 'notifications-active' : 'notifications-off'}
                            onPress={isSendingLocation ? this._stopUpdatingLocation : this._requestLocationAndUpdates}
                            raised
                            reverse
                            style={{alignSelf: 'center'}}
                        />
                        
                        {!error ? (<Text style={styles.standardTextStyle}>
                            {isSendingLocation ? 'Sending you location...' : 'Tap to send your location'}
                        </Text>) : (
                            <Text>Location services are unavailable: {error}</Text>
                        )}

                        {location ? (
                            <View style={{alignItems: 'center'}} >
                                <Text style={styles.standardTextStyle}>
                                    Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                                </Text>
                                <Text style={styles.standardTextStyle}>Timestamp: {location.timestamp} </Text>
                            </View>
                        ): undefined}

                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    controlContainerStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    standardTextStyle: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 8
    }
});

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

export default connect(mapStateToProps) (PanicScreen);