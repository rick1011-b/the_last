import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import FormBanda from '../screens/Bandas/FormBanda';
// Você pode adicionar outras telas aqui, como DetalheBanda, etc.

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Nova Banda" component={FormBanda} />
    </Stack.Navigator>
  );
}
