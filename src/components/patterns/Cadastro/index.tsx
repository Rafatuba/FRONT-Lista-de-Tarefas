import React, { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "./styles";
import { theme } from "../../../theme";
import logoImage from "../../../assets/logo2.png";
import * as Yup from "yup";

import { cadastrar } from "../../../servicos/requsicoesFirebase";

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [errors, setErrors] = useState<{
    email: string;
    senha: string;
    confirmaSenha: string;
  }>({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
    confirmaSenha: Yup.string().oneOf(
      [Yup.ref("senha"), null],
      "As senhas não coincidem"
    ),
  });

  async function realizarCadastro() {
    try {
      await validationSchema.validate(
        { email, senha, confirmaSenha },
        { abortEarly: false }
      );
      const resultado = await cadastrar(email, senha);
      setEmail("");
      setSenha("");
      setConfirmaSenha("");
      setErrors({ email: "", senha: "", confirmaSenha: "" });

      if (resultado == "sucesso") {
        Alert.alert("PARABÉNS!!! Você foi cadastrado com sucesso!");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
      } else {
        Alert.alert(resultado);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: {
          email: string;
          senha: string;
          confirmaSenha: string;
        } = { email: "", senha: "", confirmaSenha: "" };
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage} style={styles.img} />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        placeholder="Novo e-mail"
        placeholderTextColor={theme.colors.base.gray300}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        placeholder="Nova senha"
        placeholderTextColor={theme.colors.base.gray300}
        secureTextEntry
      />
      {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
      <TextInput
        style={styles.input}
        value={confirmaSenha}
        onChangeText={(texto) => setConfirmaSenha(texto)}
        placeholder="Confirmar nova senha"
        placeholderTextColor={theme.colors.base.gray300}
        secureTextEntry
      />
      {errors.confirmaSenha && (
        <Text style={styles.errorText}>{errors.confirmaSenha}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => realizarCadastro()}
      >
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
