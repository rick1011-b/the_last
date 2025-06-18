import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { Appbar, Card, FAB, IconButton, Text } from 'react-native-paper';
import { carregarMusicas, salvarMusicas } from '../../services/storage';

export default function ListaMusicas({ navigation }) {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarMusicas().then(setMusicas);
    });
    return unsubscribe;
  }, [navigation]);

  function excluirMusica(id) {
    Alert.alert('Confirmação', 'Deseja excluir esta música?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const novasMusicas = musicas.filter(m => m.id !== id);
          setMusicas(novasMusicas);
          await salvarMusicas(novasMusicas);
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Músicas" />
      </Appbar.Header>

      {musicas.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhuma música cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={musicas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={{ margin: 8 }}>
              <Card.Title
                title={item.titulo}
                subtitle={`Banda: ${item.banda} | Ano: ${item.ano}`}
                right={() => (
                  <>
                    <IconButton
                      icon="pencil"
                      onPress={() => navigation.navigate('Nova Música', { musica: item })}
                    />
                    <IconButton icon="delete" onPress={() => excluirMusica(item.id)} />
                  </>
                )}
              />
              <Card.Content>
                <Text>Duração: {item.duracao}</Text>
                <Text>Gênero: {item.genero}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('Nova Música')}
      />
    </>
  );
}
