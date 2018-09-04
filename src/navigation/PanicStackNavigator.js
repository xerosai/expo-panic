import {createStackNavigator} from 'react-navigation';
import PanicScreen from '../screens/PanicScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default createStackNavigator({
    PanicScreen: {
        screen: PanicScreen,
        navigationOptions: {

        },
        tabBarLabel: 'Panic Button'
    },
    ProfileScreen: {
        screen: ProfileScreen
    }
}, {
    lazy: true
});
