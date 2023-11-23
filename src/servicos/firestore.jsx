import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, database } from "../config/firebase";

export async function pegarTarefas() {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    const tasksRef = collection(database, "Tasks", userId, "Tasks");
    try {
      const querySnapshot = await getDocs(tasksRef);
      let tarefas = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let tarefa = { id: doc.id, ...doc.data() };
        tarefas.push(tarefa);
      });
      return tarefas;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function deletarTarefa(id) {
  const user = auth.currentUser
  if (user) {
    const userId = user.uid
    const taskRef = collection(database, 'Tasks', userId, 'Tasks')
    try {
      const taskDocRef = doc(taskRef, id)
      await deleteDoc(taskDocRef)
      return 'OK'
    } catch (error) {
      console.log(error)
      return 'erro'
    }
  }
}