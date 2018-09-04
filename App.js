import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './src/store';
import RootTabNavigator from './src/navigation/RootTabNavigator';

export default class App extends React.Component {

    render() {

        const {store, persistor} = createStore();

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>

                    <View style = {styles.container}>
                        <RootTabNavigator/>
                    </View>
                    
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});