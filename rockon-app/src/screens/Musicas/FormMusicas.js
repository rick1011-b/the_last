import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Appbar, Button, TextInput, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { carregarMusicas, salvarMusicas } from '../../services/storage';
import uuid from 'react-native-uuid';

const schema = Yup.object().shape({
  titulo: Yup.string().required('Título é obrigatório'),
  banda: Yup.string().required('Banda é obrigatória'),
  genero: Yup.string().required('Gênero é obrigatório'),
  ano: Yup.number()
    .typeError('Ano deve ser número')
    .min(1900, 'Ano muito antigo')
    .max(new Date().getFullYear(), 'Ano inválido')
    .required('Ano é obrigatório'),
  duracao: Yup.string().required('Duração é obrigatória'),
});

export default function FormMusica({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: '',
      banda: '',
      genero: '',
      ano: '',
      duracao: '',
      id: null,
    },
  });

  useEffect(() => {
    if (route.params?.musica) {
      reset(route.params.musica);
    }
  }, [route.params?.musica]);

  async function onSubmit(data) {
    try {
      const musicasAtuais = await carregarMusicas();

      if (data.id) {
        // Editar
        const musicasAtualizadas = musicasAtuais.map(m =>
          m.id === data.id ? data : m
        );
        await salvarMusicas(musicasAtualizadas);
      } else {
        // Nova música
        data.id = uuid.v4();
        await salvarMusicas([...musicasAtuais, data]);
      }

      Alert.alert('Sucesso!', 'Música salva com sucesso.');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a música.');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={route.params?.musica ? 'Editar Música' : 'Nova Música'} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Controller
          control={control}
          name="titulo"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Título"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.titulo}
              style={styles.input}
            />
          )}
        />
        {errors.titulo && <ErrorText message={errors.titulo.message} />}

        <Controller
          control={control}
          name="banda"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Banda"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.banda}
              style={styles.input}
            />
          )}
        />
        {errors.banda && <ErrorText message={errors.banda.message} />}

        <Controller
          control={control}
          name="genero"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Gênero"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.genero}
              style={styles.input}
            />
          )}
        />
        {errors.genero && <ErrorText message={errors.genero.message} />}

        <Controller
          control={control}
          name="ano"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Ano"
              mode="outlined"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              error={!!errors.ano}
              style={styles.input}
              maxLength={4}
            />
          )}
        />
        {errors.ano && <ErrorText message={errors.ano.message} />}

        <Controller
          control={control}
          name="duracao"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Duração"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.duracao}
              style={styles.input}
            />
          )}
        />
        {errors.duracao && <ErrorText message={errors.duracao.message} />}

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
}

function ErrorText({ message }) {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <Text style={{ color: 'red', marginBottom: 8 }}>{message}</Text>
    </View>
  );
}

const styles = {
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
};
