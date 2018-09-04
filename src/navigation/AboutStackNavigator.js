import {createStackNavigator} from 'react-navigation';
import AboutScreen from '../screens/AboutScreen';

export default createStackNavigator({
    AboutScreen: {
        screen: AboutScreen
    }
}, {
    lazy: true
});