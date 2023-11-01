import React, { useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { theme } from "../../../theme";
import logoImage from "../../../assets/logo2.png";

export function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage} style={styles.img} />
      <TextInput
        style={[styles.input]}
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.colors.base.gray300}
      />
      <TextInput
        style={[styles.input]}
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        placeholder="Digite uma senha"
        placeholderTextColor={theme.colors.base.gray300}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('Principal') }}
      >
        <Text style={[styles.text]}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        <Text style={[styles.text]}>Cadastrar usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
