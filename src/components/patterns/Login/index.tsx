import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Vibration,
} from "react-native";
import { styles } from "./styles";
import { theme } from "../../../theme";
import logoImage from "../../../assets/logo2.png";
import * as Yup from "yup";
import { logar } from "../../../servicos/requsicoesFirebase";
import { Alerta } from "../../Alerta";
import { auth } from "../../../config/firebase";
import { Loading } from "../../Loading";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [errors, setErrors] = useState<{
    email: string;
    senha: string;
  }>({
    email: "",
    senha: "",
  });

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
  });

  async function realizarLogin() {
    try {
      await validationSchema.validate({ email, senha }, { abortEarly: false });
      const resultado = await logar(email, senha);
      setEmail("");
      setSenha("");

      setErrors({ email: "", senha: "" });

      if (resultado == "erro") {
        setStatusErro("firebase");
        setMensagemError("E-mail ou senha não conferem");
      } else {
        navigation.replace("Principal");
        Vibration.vibrate();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: {
          email: string;
          senha: string;
        } = { email: "", senha: "" };
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(error);
      }
    }
  }

  if (carregando) {
    return <Loading />;
  }

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
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input]}
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        placeholder="Digite uma senha"
        placeholderTextColor={theme.colors.base.gray300}
        secureTextEntry
      />
      {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

      <Alerta
        mensagem={mensagemError}
        error={statusErro == "firebase"}
        setError={setStatusErro}
        duracao={5000}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          realizarLogin();
        }}
      >
        <Text style={[styles.text]}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        <Text style={[styles.text]}>Cadastrar usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
