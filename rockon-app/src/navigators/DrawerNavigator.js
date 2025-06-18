// src/navigators/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BuscarBandas from '../screens/BuscarBandas';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Início" component={StackNavigator} />
        <Drawer.Screen name="Buscar Bandas" component={BuscarBandas} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
