import React from 'react';
import {Linking, StyleSheet, ScrollView} from 'react-native';
import {SocialIcon, Text} from 'react-native-elements';

/**
 *
 *
 * @class AboutScreen
 * @extends {React.Component}
 * @description About Screen
 */
class AboutScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'About'
    };

    _onPressGithub = () => {
        const url = 'https://github.com/xerosai';
        Linking.canOpenURL(url).then(canOpen => {
            if (!canOpen) {
                console.log('Unable to open url: ', url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.log('Failed to open link with error: ', err));
    };

    render () {
        return (
            <ScrollView contentContainerStyle={styles.contentStyle}>
                <Text h1>About This App</Text>

                <Text style={styles.normalTextStyle}>
                    This project was inspired by a panic button app developed for the government and only represents a subset of the functionality.
                </Text>

                <Text h4 style={{marginBottom: 8}}>Additional Packages Used</Text>

                <Text style={styles.normalTextStyle}>React Navigation</Text>

                <Text style={styles.normalTextStyle}>React Native Elements</Text>

                <Text style={styles.normalTextStyle}>React Redux</Text>

                <Text style={styles.normalTextStyle}>Redux Persist</Text>

                <Text style={styles.normalTextStyle}>Expo</Text>

                <SocialIcon 
                    button
                    onPress={this._onPressGithub}
                    raised
                    style={{width: '100%'}}
                    title="I'm on Github"
                    type="github"
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        alignItems: 'center',
        flex: 1,
        padding: 24
    },
    normalTextStyle: {
        color: '#666',
        fontSize: 13,
        letterSpacing: 1.05,
        lineHeight: 18,
        marginBottom: 12,
        textAlign: 'center'
    }
});

export default AboutScreen;