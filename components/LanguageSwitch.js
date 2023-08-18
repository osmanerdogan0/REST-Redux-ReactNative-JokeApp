import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import '../lang/_i18n';
import {useTranslation} from 'react-i18next';
const LanguageSwitcher = () => {
  const {t, i18n} = useTranslation();
  const [isLangEnabled, setIsLangEnabled] = useState(true);

  const toggleLangSwitch = () => {
    let now = i18n.language;
    setIsLangEnabled(previousState => !previousState);

    i18n.changeLanguage(now === 'tr' ? 'en' : 'tr');
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.languageText,
          {fontWeight: i18n.language == 'tr' ? '900' : '600'},
        ]}>
        TR
      </Text>
      <Switch
        trackColor={{
          false: '#bbe5fb',
          true: '#3d60c2',
        }}
        thumbColor={isLangEnabled ? '#3C3B6' : '#fafafa'}
        ios_backgroundColor="#E30A17"
        onValueChange={toggleLangSwitch}
        value={isLangEnabled}
        style={{marginHorizontal: 5}}
      />
      <Text
        style={[
          styles.languageText,
          {fontWeight: i18n.language == 'en' ? '900' : '600'},
        ]}>
        EN
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  languageText: {fontSize: 12, color: '#0f0f0f'},
});
export default LanguageSwitcher;
