import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListaBandas from '../screens/Bandas/ListaBandas';
import ListaMusicas from '../screens/Musicas/ListaMusicas';
import ListaEventos from '../screens/Eventos/ListaEventos';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bandas" component={ListaBandas} />
      <Tab.Screen name="Músicas" component={ListaMusicas} />
      <Tab.Screen name="Eventos" component={ListaEventos} />
    </Tab.Navigator>
  );
}
