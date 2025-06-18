import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, TextInput, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { carregarBandas, salvarBandas } from '../../services/storage';
import uuid from 'react-native-uuid';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  genero: Yup.string().required('Gênero é obrigatório'),
  pais: Yup.string().required('País é obrigatório'),
  anoFormacao: Yup.number()
    .typeError('Ano deve ser número')
    .min(1900, 'Ano muito antigo')
    .max(new Date().getFullYear(), 'Ano inválido')
    .required('Ano de formação é obrigatório'),
  biografia: Yup.string().min(10, 'Biografia muito curta').required('Biografia é obrigatória'),
});

export default function FormBanda({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      genero: '',
      pais: '',
      anoFormacao: '',
      biografia: '',
      id: null,
    },
  });

  useEffect(() => {
    if (route.params?.banda) {
      reset(route.params.banda);
    }
  }, [route.params?.banda]);

  async function onSubmit(data) {
    try {
      const bandasAtuais = await carregarBandas();

      if (data.id) {
        // Editar banda existente
        const bandasAtualizadas = bandasAtuais.map(banda =>
          banda.id === data.id ? data : banda
        );
        await salvarBandas(bandasAtualizadas);
      } else {
        // Nova banda
        data.id = uuid.v4();
        await salvarBandas([...bandasAtuais, data]);
      }

      Alert.alert('Sucesso!', 'Banda salva com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a banda.');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={route.params?.banda ? 'Editar Banda' : 'Nova Banda'} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nome"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.nome}
              style={styles.input}
            />
          )}
        />
        {errors.nome && <ErrorText message={errors.nome.message} />}

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
          name="pais"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="País de Origem"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.pais}
              style={styles.input}
            />
          )}
        />
        {errors.pais && <ErrorText message={errors.pais.message} />}

        <Controller
          control={control}
          name="anoFormacao"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Ano de Formação"
              mode="outlined"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              error={!!errors.anoFormacao}
              style={styles.input}
              maxLength={4}
            />
          )}
        />
        {errors.anoFormacao && <ErrorText message={errors.anoFormacao.message} />}

        <Controller
          control={control}
          name="biografia"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Biografia"
              mode="outlined"
              multiline
              numberOfLines={4}
              value={value}
              onChangeText={onChange}
              error={!!errors.biografia}
              style={[styles.input, { height: 100 }]}
            />
          )}
        />
        {errors.biografia && <ErrorText message={errors.biografia.message} />}

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
