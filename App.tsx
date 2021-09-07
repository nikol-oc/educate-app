import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native'

import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import MainNavigator from './src/navigator/mainNavigator';

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item } : { item: any }) => {
    return (
        <View
            style={{
              flex: 1,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 100,
            }}>
            <Text style={styles.introTitleStyle}>
              {item.title}
            </Text>
            <Image
              style={styles.introImageStyle}
              source={item.image} />
            <Text style={styles.introTextStyle}>
              {item.text}
            </Text>
          </View>
    );
  };

  return (
    <>
      {showRealApp ? (
        <NavigationContainer>
           <MainNavigator/>
       </NavigationContainer>
      ) : (
        <AppIntroSlider
          data={slides}
          skipLabel={'Regresar'}
          doneLabel={'Finalizar'}
          nextLabel={'Siguiente'}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Aprende y estudia desde tu casa',
    title: 'Bienvenido a Educate',
    image: require('./src/assets/toga.png'),
    backgroundColor: '#FF61EC',
  },
  {
    key: 's2',
    title: 'Obten nuevos conocimientos',
    image: require('./src/assets/study.jpeg'),
    text: 'Cursos con 25% de descuento',
    backgroundColor: '#BD5DE6',
  },
  {
    key: 's3',
    title: 'Insertate en el mundo laboral',
    text: 'Conoce a las empresas del momento',
    image: require('./src/assets/laboral.jpg'),
    backgroundColor: '#8F5AFA',
  }  
];