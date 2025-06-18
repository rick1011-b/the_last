import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { Appbar, Card, FAB, IconButton, Text } from 'react-native-paper';
import { carregarEventos, salvarEventos } from '../../services/storage';

export default function ListaEventos({ navigation }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarEventos().then(setEventos);
    });
    return unsubscribe;
  }, [navigation]);

  function excluirEvento(id) {
    Alert.alert('Confirmação', 'Deseja excluir este evento?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const novosEventos = eventos.filter(e => e.id !== id);
          setEventos(novosEventos);
          await salvarEventos(novosEventos);
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Eventos" />
      </Appbar.Header>

      {eventos.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhum evento cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={{ margin: 8 }}>
              <Card.Title
                title={item.nome}
                subtitle={`Local: ${item.local} - Data: ${item.data}`}
                right={() => (
                  <>
                    <IconButton
                      icon="pencil"
                      onPress={() => navigation.navigate('Novo Evento', { evento: item })}
                    />
                    <IconButton icon="delete" onPress={() => excluirEvento(item.id)} />
                  </>
                )}
              />
              <Card.Content>
                <Text>Descrição: {item.descricao}</Text>
                <Text>Contato: {item.contato}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('Novo Evento')}
      />
    </>
  );
}
