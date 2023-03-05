import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

{/* remember states used for the things that changes often, so when u write the task it will be stored in the task(const arrayinin ilki) sonra bir array e aktaricaz onu tum taskleri.. */}
export default function App() {

  const [task, setTask] = useState();

  {/* first item is the name of the state, the thing ull be writing and the second is  the function that well be using to set the state*/}
  {/* so on the textinput down below we'll grap what u type and settask will set it to task
  well setthetask to be that text, setTask will set the state for the task state*/}

  {/* will log the task that we stored in the state.*/}
  const [taskItems, setTaskItems] = useState([]);

  var date = new Date().toLocaleString()

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  {/* ..taskitems, task = whateever in the taskItems array + new task 
  settask null clears the way for the new things to be typed in the writing section*/}


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* tasks headline */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Gorevler</Text>
        <Text style={styles.sectionDate}>Bugun: {date}</Text>

        
        <View style={styles.items}>
          {/* tasks will be here */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* write the task here */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Buraya yaz'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
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
      paddingTop:80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 33,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    sectionDate:{
      fontsize: 12,
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 5,
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: "absolute",
      bottom: 60,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: 250,
      backgroundColor: "white",
      borderRadius: 60,
      borderColor: "gray",
      borderWidth: 1,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: "white",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "gray",
      borderWidth: 1,

    },
    addText: {},
    
});
