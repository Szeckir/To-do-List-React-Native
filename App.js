import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'
import { useState } from 'react';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState( [] );

  const handleAddTask = () => {
    if(task != null) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null); 
    }
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks: </Text>
        
        <View style={styles.itens}>
          {
            taskItems.map((item, index) => { 
              return (
                <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                  <Task key={index} text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View> 

      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
        >

          <TextInput style={styles.input} placeholder={'Write your task'} value={task} onChangeText={text => setTask(text)}/>

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addBtn}>
              <Text styles={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  }, 
  tasksWrapper: {
    paddingTOP: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  itens: {
    marginTop: 30,
  },
  writeTask: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    marginLeft: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '75%',
    borderColor: '#C0C0C0',
    borderWidth: 0.5,
  },
  addBtn: {
    marginRight: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25,
    borderColor: '#C0C0C0',
    borderWidth: 0.5,
  },
  addText: {

  },
});
