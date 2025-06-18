import { createStackNavigator } from '@react-navigation/stack';
import ListaBandas from '../screens/Bandas/ListaBandas';
import FormBanda from '../screens/Bandas/FormBanda';
import ListaMusicas from '../screens/Musicas/ListaMusicas';
import FormMusica from '../screens/Musicas/FormMusicas';
import ListaEventos from '../screens/Eventos/ListaEventos';
import FormEvento from '../screens/Eventos/FormEvento';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Bandas">
      {/* Bandas */}
      <Stack.Screen name="Bandas" component={ListaBandas} />
      <Stack.Screen name="Nova Banda" component={FormBanda} />
{/* Músicas /}
<Stack.Screen name="Músicas" component={ListaMusicas} />
<Stack.Screen name="Nova Música" component={FormMusica} />
{/ Eventos */}
<Stack.Screen name="Eventos" component={ListaEventos} />
<Stack.Screen name="Novo Evento" component={FormEvento} />
</Stack.Navigator>
);
}

yaml
Copiar
Editar

