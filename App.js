import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigator/MyStack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/Redux/Store/Store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
