import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button title="EN" onPress={() => i18n.changeLanguage('en')} />
      <Button title="FR" onPress={() => i18n.changeLanguage('fr')} />
    </View>
  );
};
