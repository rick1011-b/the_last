// App.js
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import DrawerNavigator from './src/navigators/DrawerNavigator';

export default function App() {
  return (
    <PaperProvider>
      <DrawerNavigator />
    </PaperProvider>
  );
}
