import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Alert, TextInput } from 'react-native';

export default function App() {
  
  const  [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if(taskText.trim() === ""){
      Alert.alert("Cannot add an empty task")
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };

    setTasks([...tasks,newTask]);
    setTaskText('');
  };


  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, done: !task.done} : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const renderItem = ({item}) =>(
    <View style={styles.taskItem}>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}

        <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>
        {item.done ? "☑️" : "⬜"}
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>☑️</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={{fontSize: 16, color: "white"}}>addTask</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}/>
    </View>
  );
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 50, backgroundColor: 'lightblue' },
  inputRow: { flexDirection: 'row', marginBottom: 78 },
  input: { flex: 1, borderColor: 'black', borderWidth: 1, padding: 8, borderRadius: 5 },
  addButton: { marginLeft: 5, backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  taskItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  taskText: { flex: 1, fontSize: 16 },
  taskTextDone: { textDecorationLine: 'line-through', color: '#888' },
  checkbox: { marginRight: 10, fontSize: 18 },
  deleteButton: { marginLeft: 10, fontSize: 18, color: 'red' }
});

