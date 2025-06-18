import AsyncStorage from '@react-native-async-storage/async-storage';

const BANDAS_KEY = '@rockon_bandas';
const MUSICAS_KEY = '@rockon_musicas';
const EVENTOS_KEY = '@rockon_eventos';

export async function salvarBandas(bandas) {
  try {
    await AsyncStorage.setItem(BANDAS_KEY, JSON.stringify(bandas));
  } catch (error) {
    console.error('Erro ao salvar bandas:', error);
  }
}

export async function carregarBandas() {
  try {
    const json = await AsyncStorage.getItem(BANDAS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar bandas:', error);
    return [];
  }
}

export async function salvarMusicas(musicas) {
  try {
    await AsyncStorage.setItem(MUSICAS_KEY, JSON.stringify(musicas));
  } catch (error) {
    console.error('Erro ao salvar músicas:', error);
  }
}

export async function carregarMusicas() {
  try {
    const json = await AsyncStorage.getItem(MUSICAS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar músicas:', error);
    return [];
  }
}

export async function salvarEventos(eventos) {
  try {
    await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
  } catch (error) {
    console.error('Erro ao salvar eventos:', error);
  }
}

export async function carregarEventos() {
  try {
    const json = await AsyncStorage.getItem(EVENTOS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
    return [];
  }
}
