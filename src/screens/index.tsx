import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { TaskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/Empty";
import { uuid } from "../components/utils/uuid";
import { auth, database } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

export function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState("");
  const newTaskInputRef = useRef<TextInput>(null);

  const dadosUsuario = auth.currentUser.email;
  const partes = dadosUsuario.split("@");
  const emailUsuario = partes[0];

         // Tentando pegar do Firestore(ainda não funciona)
  // useEffect(() => {
  //   async function fetchTasks() {
  //     const user = auth.currentUser;

  //     if (user) {
  //       const userId = user.uid;
  //       const tasksRef = collection(database, 'Tasks', userId, 'tasks');
        
  //       try {
  //         const querySnapshot = await getDocs(tasksRef);
  //         const tasksData = querySnapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         })) as TaskDTO[];
  //         setTasks(tasksData);
  //       } catch (error) {
  //         console.error('Erro ao obter tarefas do Firestore', error);
  //       }
  //     }
  //   }

  //   fetchTasks();
  // }, []);

  async function handleTaskAdd() {
    // if (newTask !== "" && newTask.length >= 5) {
    //   setTasks((tasks) => [
    //     ...tasks,
    //     { id: uuid(), isCompleted: false, title: newTask.trim() },
    //   ]);
    //   setNewTask("");
      

    //   newTaskInputRef.current?.blur();
    // }

    if (newTask !== "" && newTask.length >= 5) {
      const user = auth.currentUser;
  
      if (user) {
        const userId = user.uid;
        const tasksRef = collection(database, 'Tasks', userId, 'Tasks');
  
        try {
          const newTaskDocRef = await addDoc(tasksRef, {
            title: newTask.trim(),
            isCompleted: false,
          });
  
          // Atualize o estado local com a nova tarefa
          setTasks((prevTasks) => [
            ...prevTasks,
            { id: newTaskDocRef.id, title: newTask.trim(), isCompleted: false },
          ]);
  
          setNewTask("");
          newTaskInputRef.current?.blur();
        } catch (error) {
          console.error('Erro ao adicionar tarefa ao Firestore', error);
        }
      }
    }
  }

  function handleTaskDone(id: string) {
    setTasks((task) =>
      task.map((task) => {
        task.id === id ? (task.isCompleted = !task.isCompleted) : null;
        return task;
      })
    );
  }
  function handleTaskDeleted(id: string) {
    Alert.alert("Excluir Tarefa", "Deseja excluir essa Tarefa?", [
      {
        text: "Sim",
        style: "default",
        onPress: () =>
          setTasks((task) => task.filter((task) => task.id !== id)),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  const totalTasksCreated = tasks.length;
  const totalTasksCompleted = tasks.filter(
    ({ isCompleted }) => isCompleted
  ).length;

  return (
    <View style={styles.container}>
      <Header
        inputRef={newTaskInputRef}
        task={newTask}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCriadas}>Criadas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{totalTasksCreated}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksConcluidas}>Concluídas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{totalTasksCompleted}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDeleted={() => handleTaskDeleted(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
        <View style={styles.footer}>
          <Text style={[styles.textUsuario]}>Usuário: {emailUsuario}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              auth.signOut();
              console.log("Logout pressionado");
              navigation.replace("Login");
            }}
          >
            <Text style={[styles.text]}>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
