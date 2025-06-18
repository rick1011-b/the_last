// src/screens/BuscarBandas.js
import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import api from '../services/api';
import { salvarEntidade } from '../utils/storage';

export default function BuscarBandas() {
  const [nomeBusca, setNomeBusca] = useState('');
  const [banda, setBanda] = useState(null);
  const [erro, setErro] = useState('');

  async function buscar() {
    setErro('');
    try {
      const resposta = await api.get(`/search.php?s=${nomeBusca}`);
      const resultado = resposta.data.artists?.[0];
      if (resultado) {
        setBanda(resultado);
      } else {
        setErro('Banda não encontrada.');
        setBanda(null);
      }
    } catch (e) {
      setErro('Erro ao buscar banda.');
    }
  }

  async function salvar() {
    if (!banda) return;
    const novaBanda = {
      id: Date.now().toString(),
      nome: banda.strArtist,
      estilo: banda.strGenre || 'Rock',
      biografia: banda.strBiographyPT || banda.strBiographyEN || '',
    };
    await salvarEntidade('bandas', novaBanda);
    alert('Banda salva!');
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <TextInput
        label="Nome da Banda"
        value={nomeBusca}
        onChangeText={setNomeBusca}
        mode="outlined"
      />
      <Button onPress={buscar} mode="contained" style={{ marginTop: 10 }}>
        Buscar
      </Button>

      {erro ? <Text style={{ color: 'red', marginTop: 10 }}>{erro}</Text> : null}

      {banda && (
        <Card style={{ marginTop: 16 }}>
          {banda.strArtistThumb && (
            <Image
              source={{ uri: banda.strArtistThumb }}
              style={{ height: 200, width: '100%' }}
            />
          )}
          <Card.Content>
            <Text variant="titleLarge">{banda.strArtist}</Text>
            <Text variant="bodyMedium">Estilo: {banda.strGenre}</Text>
            <Text variant="bodySmall">{banda.strBiographyPT?.slice(0, 300) || banda.strBiographyEN?.slice(0, 300)}...</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={salvar}>Salvar Banda</Button>
          </Card.Actions>
        </Card>
      )}
    </ScrollView>
  );
}
