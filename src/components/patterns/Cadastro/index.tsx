import React, { useEffect, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import {styles} from './styles'
import { theme } from '../../../theme'
import logoImage from '../../../assets/logo.png'
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  useEffect(() => {
    createUserWithEmailAndPassword(auth, "rafatubateste2@email.com", "teste123")
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
  })
  .catch((error) => {
   console.log(error)
  });
  }, [])

  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage}/>
      <TextInput 
          style={[
            styles.input,
          ]} 
          value={email}
          onChangeText={texto => setEmail(texto)}
          placeholder='Digite seu e-mail'
          placeholderTextColor={theme.colors.base.gray300}
          />
      <TextInput 
          style={[
            styles.input,
          ]} 
          value={senha}
          onChangeText={texto => setSenha(texto)}
          placeholder='Digite uma senha'
          placeholderTextColor={theme.colors.base.gray300}
          secureTextEntry
          />
      <TextInput 
        style={[
          styles.input,
        ]} 
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        placeholder='Confirmar senha'
        placeholderTextColor={theme.colors.base.gray300}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {console.log("clicou em Cadastrar")}}
      >
        <Text style={[styles.text]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}