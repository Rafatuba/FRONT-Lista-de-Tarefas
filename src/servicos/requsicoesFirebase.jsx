import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function cadastrar(email, senha, confirmaSenha) {
  createUserWithEmailAndPassword(auth, email, senha, confirmaSenha )
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
  })
  .catch((error) => {
   console.log(error)
  });
}