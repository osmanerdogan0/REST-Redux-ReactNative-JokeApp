import {set} from 'immer/dist/internal';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native';
import {useGetJokeByTypeQuery} from '../redux/jokesApi';
import LottieView from 'lottie-react-native';

import '../lang/_i18n';
import {useTranslation} from 'react-i18next';
import translate from 'translate-google-api';

const windowHeight = Dimensions.get('screen').height;
const HomeScreen = () => {
  const {t, i18n} = useTranslation();
  const categoryList = ['General', 'Programming', 'Knock-Knock'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState('General');
  const [whyButton, setWhyButton] = useState(false);
  const [traSetup, setTraSetup] = useState('');
  const [traPunch, setTraPunch] = useState('');

  const {isLoading, data, isError, isSuccess, refetch} = useGetJokeByTypeQuery(
    category.toLocaleLowerCase(),
  );
  const translateText = async () => {
    if (i18n.language == 'tr') {
      let temp = await translate(data?.[0]?.setup, {
        tld: 'com',
        to: 'tr',
      });
      setTraSetup(temp);
      let tempPunch = await translate(data?.[0]?.punchline, {
        tld: 'com',
        to: 'tr',
      });
      setTraPunch(tempPunch);
    } else {
      setTraSetup(data?.[0]?.setup);
      setTraPunch(data?.[0]?.punchline);
    }
    //console.log('temp-->', temp);
  };
  useEffect(() => {
    translateText();
  }, [data, i18n.language]);

  //console.log('data-->', data);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          style={styles.loadingAnimation}
          source={require('../assets/loading-animation.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  if (data) {
    return (
      <View style={styles.dataContainer}>
        {whyButton === true && (
          <LottieView
            style={styles.laughAnimation}
            source={
              category === 'General'
                ? require('../assets/general-animation.json')
                : category === 'Programming'
                ? require('../assets/programming-animation.json')
                : require('../assets/knock-knock-animation.json')
            }
            autoPlay
            loop
          />
        )}
        <View style={styles.middleArea}>
          <TouchableOpacity
            onPress={() => {
              if (currentIndex - 1 >= 0) {
                setCurrentIndex(currentIndex - 1);
                setCategory(categoryList[currentIndex - 1]);
                refetch();
              } else {
                setCurrentIndex(categoryList.length - 1);
                setCategory(categoryList[categoryList.length - 1]);
                refetch();
              }
            }}
            style={styles.leftButton}>
            <Text style={styles.arrowButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.categoryButton}>
            <Text style={styles.arrowButtonText}>
              {categoryList[currentIndex] == 'General'
                ? t('general')
                : categoryList[currentIndex] == 'Programming'
                ? t('programming')
                : t('knock')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (currentIndex + 1 <= categoryList.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setCategory(categoryList[currentIndex + 1]);
                refetch();
              } else {
                setCurrentIndex(0);
                setCategory(categoryList[0]);
                refetch();
              }
            }}
            style={styles.rightButton}>
            <Text style={styles.arrowButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.card,
            {backgroundColor: whyButton == false ? '#facd48' : '#b19d81'},
          ]}>
          {whyButton == true && (
            <Text style={styles.hintSetupText}>{traSetup}</Text>
          )}
          <Text style={styles.mainText}>
            {whyButton == false ? traSetup : traPunch}
          </Text>
        </View>

        {whyButton === false ? (
          <TouchableOpacity
            onPress={() => {
              setWhyButton(true);
            }}
            style={styles.whyButton}>
            <Text style={styles.whyButtonText}>
              {category === 'Knock-Knock' && t('who')}
              {category === 'General' && t('why')}
              {category === 'Programming' && t('why')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              refetch();
              setWhyButton(false);
            }}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: windowHeight - 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: '100%',
    height: '100%',
    zIndex: 99,
  },
  dataContainer: {
    width: '100%',
    height: windowHeight - 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  laughAnimation: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    zIndex: 10,
    top: -200,
  },
  middleArea: {
    width: '80%',
    height: 50,
    backgroundColor: 'transparent',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    backgroundColor: 'transparent',
    borderColor: '#0f0f0f',
    borderWidth: 1,
    height: '100%',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 5,
  },
  arrowButtonText: {fontSize: 18, fontWeight: '600', color: '#0f0f0f'},
  categoryButton: {
    backgroundColor: 'transparent',
    borderColor: '#0f0f0f',
    borderWidth: 1,
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightButton: {
    backgroundColor: 'transparent',
    borderColor: '#0f0f0f',
    borderWidth: 1,
    height: '100%',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  card: {
    width: '80%',
    height: windowHeight * 0.5 - 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 50,
  },
  hintSetupText: {
    fontSize: 14,
    color: '#0f0f0f',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainText: {
    fontSize: 18,
    color: '#0f0f0f',
    fontWeight: '900',
    textAlign: 'center',
  },
  whyButton: {
    width: '80%',
    height: 45,
    backgroundColor: '#212224',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 20,
  },
  whyButtonText: {fontSize: 14, color: '#fafafa', fontWeight: '600'},
  retryButton: {
    width: '80%',
    height: 45,
    backgroundColor: '#8a5529',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 20,
  },
  retryButtonText: {fontSize: 12, color: '#fafafa', fontWeight: '600'},
});
export default HomeScreen;
