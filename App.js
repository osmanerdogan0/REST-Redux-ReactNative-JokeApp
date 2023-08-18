import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import HomeScreen from './components/Home';
import LanguageSwitcher from './components/LanguageSwitch';
import {store} from './redux/store';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  return (
    <Provider store={store}>
      <LinearGradient
        start={{x: 0.5, y: 0.1}}
        colors={['#EBBE9B', '#E7A977']}
        style={styles.linearContainer}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.header}>
          <Text style={styles.titleText}>Knock Knock</Text>
          <View style={styles.languageContainer}>
            <LanguageSwitcher />
          </View>
        </View>

        <HomeScreen />
      </LinearGradient>
    </Provider>
  );
};

const styles = StyleSheet.create({
  linearContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: 'transparent',
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  titleText: {fontSize: 24, color: '#0f0f0f', fontWeight: '900'},
  languageContainer: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 99,
    backgroundColor: 'transparent',
  },
});

export default App;
