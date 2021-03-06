import React from 'react';
import { AppLoading } from 'expo';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';

import { Text, useFonts } from '@vpicone/components-react-native';

import ButtonDemo from './components/demos/Button';
import TextDemo from './components/demos/Text';

import Icon from '@vpicone/icons-react-native';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            <Text kind="h6">Button</Text>
            <ButtonDemo />
            <Text kind="h6">Icons</Text>
            <View style={styles.icons}>
              <Icon size={48} name="windy--dust" />
              <Icon size={48} name="face--mask" />
            </View>
            <Text kind="h6">Typography</Text>
            <TextDemo />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  list: {
    // backgroundColor: '#e0e0e0',
  },
});

export default App;
