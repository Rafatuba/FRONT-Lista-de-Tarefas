import React, { useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import {styles} from './styles'
import { theme } from '../../../theme'
import logoImage from '../../../assets/logo2.png'

import { cadastrar } from "../../../servicos/requsicoesFirebase";

export function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

 async function realizarCadastro() {
  await cadastrar(email, senha, confirmaSenha)
  setEmail('')
  setSenha('')
  setConfirmaSenha('')
 }

  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage} style={styles.img}/>
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
        onPress={() => realizarCadastro()}
      >
        <Text style={[styles.text]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}