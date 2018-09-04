import React from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from 'react-navigation';
import PanicStackNavigator from './PanicStackNavigator';
import AboutStackNavigator from './AboutStackNavigator';

const ICON_SIZE = 24;

/**
 * 
 */
export default createBottomTabNavigator({
    PanicScreenStack: {
        path: '/',
        screen: PanicStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Panic Button',
            tabBarIcon: ({tintColor}) => {
                return (
                    <Icon 
                        color={tintColor}
                        name="security"
                        size={ICON_SIZE}
                    />
                )
            }
        }
    },
    AboutScreenStack: {
        screen: AboutStackNavigator,
        navigationOptions: {
            tabBarLabel: 'About',
            tabBarIcon: ({tintColor}) => {
                return (
                    <Icon 
                        color={tintColor}
                        name="info"
                        size={ICON_SIZE}
                    />
                )
            }
        }
    }
}, {
    lazy: true,
    tabBarOptions: {
        showIcon: true,
        labelStyle: {
            fontSize: 13
        }
    }
});