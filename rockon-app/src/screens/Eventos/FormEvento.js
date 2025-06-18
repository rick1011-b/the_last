import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Appbar, Button, TextInput, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { carregarEventos, salvarEventos } from '../../services/storage';
import uuid from 'react-native-uuid';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome do evento é obrigatório'),
  local: Yup.string().required('Local é obrigatório'),
  data: Yup.string()
    .required('Data é obrigatória')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data deve estar no formato DD/MM/AAAA'
    ),
  descricao: Yup.string().required('Descrição é obrigatória'),
  contato: Yup.string().required('Contato é obrigatório'),
});

export default function FormEvento({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      local: '',
      data: '',
      descricao: '',
      contato: '',
      id: null,
    },
  });

  useEffect(() => {
    if (route.params?.evento) {
      reset(route.params.evento);
    }
  }, [route.params?.evento]);

  async function onSubmit(data) {
    try {
      const eventosAtuais = await carregarEventos();

      if (data.id) {
        const eventosAtualizados = eventosAtuais.map(e =>
          e.id === data.id ? data : e
        );
        await salvarEventos(eventosAtualizados);
      } else {
        data.id = uuid.v4();
        await salvarEventos([...eventosAtuais, data]);
      }

      Alert.alert('Sucesso!', 'Evento salvo com sucesso.');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o evento.');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={route.params?.evento ? 'Editar Evento' : 'Novo Evento'} />
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
          name="local"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Local"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.local}
              style={styles.input}
            />
          )}
        />
        {errors.local && <ErrorText message={errors.local.message} />}

        <Controller
          control={control}
          name="data"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Data (DD/MM/AAAA)"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.data}
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
            />
          )}
        />
        {errors.data && <ErrorText message={errors.data.message} />}

        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Descrição"
              mode="outlined"
              multiline
              numberOfLines={3}
              value={value}
              onChangeText={onChange}
              error={!!errors.descricao}
              style={styles.input}
            />
          )}
        />
        {errors.descricao && <ErrorText message={errors.descricao.message} />}

        <Controller
          control={control}
          name="contato"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Contato"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.contato}
              style={styles.input}
            />
          )}
        />
        {errors.contato && <ErrorText message={errors.contato.message} />}

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
