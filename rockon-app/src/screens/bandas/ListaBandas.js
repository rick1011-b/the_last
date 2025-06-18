import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Appbar, Card, FAB, IconButton, Text } from 'react-native-paper';
import { carregarBandas, salvarBandas } from '../../services/storage';

export default function ListaBandas({ navigation }) {
  const [bandas, setBandas] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarBandas().then(setBandas);
    });
    return unsubscribe;
  }, [navigation]);

  function excluirBanda(id) {
    Alert.alert('Confirmação', 'Deseja realmente excluir esta banda?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: () => {
          const novasBandas = bandas.filter(banda => banda.id !== id);
          setBandas(novasBandas);
          salvarBandas(novasBandas);
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bandas" />
      </Appbar.Header>

      {bandas.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhuma banda cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={bandas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={{ margin: 8 }}>
              <Card.Title
                title={item.nome}
                subtitle={`${item.genero} - ${item.pais}`}
                right={() => (
                  <>
                    <IconButton
                      icon="pencil"
                      onPress={() => navigation.navigate('Nova Banda', { banda: item })}
                    />
                    <IconButton icon="delete" onPress={() => excluirBanda(item.id)} />
                  </>
                )}
              />
              <Card.Content>
                <Text>{item.biografia}</Text>
                <Text>Ano: {item.anoFormacao}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('Nova Banda')}
      />
    </>
  );
}
