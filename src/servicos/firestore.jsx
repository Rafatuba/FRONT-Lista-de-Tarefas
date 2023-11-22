import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../config/firebase";

export async function pegarProdutos() {
  const user = auth.currentUser

  if (user) {
          const userId = user.uid;
          const tasksRef = collection(database, 'Tasks', userId, 'Tasks');
  try {
    const querySnapshot = await getDocs(tasksRef);
    let tarefas = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let tarefa = {id: doc.id, ...doc.data()}
      tarefas.push(tarefa)
    });
    return tarefas
  } catch (error) {
    console.log(error);
  }
}
}