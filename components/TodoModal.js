import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Alert } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from "../Colors";


export default class TodoModal extends React.Component {

  state = {
    newTodo: "",
    cals: ""
  }

  toggleTodoCompleted = index => {
    let list = this.props.list
    list.todos[index];

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    
    list.todos.push({title: this.state.newTodo, calories: this.state.cals});

    this.props.updateList(list);
    this.setState({ newTodo: "", cals: ""});
    Keyboard.dismiss();
  };

  deleteTodo = index => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  }

  toggleDelete = index => {
    Alert.alert(
      "Deleting Calories:",
      "Are you sure you want to delete them?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed")
        },
        { text: "Sure", onPress: () => this.deleteTodo(index) }
      ],
      { cancelable: false }
    );
  };

  renderTodo = (todo, index) => {
    return (
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
              <AntDesign name="like2" size={20} color={colors.green} style={{ width: 32}} />
          </TouchableOpacity>

          <Text style={[
            styles.todo, 
            { color: colors.black }]}>
            {todo.title} - {todo.calories}
          </Text>

          <TouchableOpacity onPress={() => this.toggleDelete(index)} style={styles.deleteCalories}>
              <AntDesign name="delete" size={20} color={colors.red} style={{ width: 32}} />
          </TouchableOpacity>
        </View>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.totalCalories;
    const completedCount = list.todos.reduce((total, todos) => total + parseInt(todos.calories), 0);

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <SafeAreaView style={styles.container}>
              <TouchableOpacity style={{position: 'absolute', 
              top: 64, 
              right: 32, 
              zIndex: 10}} 
              onPress={this.props.closeModal}>
                  <AntDesign name="close" 
                  size={24} 
                  color={colors.black} 
                  />
              </TouchableOpacity>

              <View style={[styles.section, 
                styles.header, 
                { borderBottomColor: list.color}]}>
                  <View>
                      <Text style={styles.title}>{list.name}</Text>
                      <Text style={styles.taskCount}>
                          {completedCount} of {taskCount} calories
                      </Text>
                      <Text style={styles.taskCount}>
                          {taskCount - completedCount} calories left
                      </Text>
                  </View>
              </View>

              <View 
              style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                  <FlatList 
                    data={list.todos} 
                    renderItem={({ item, index }) => this.renderTodo(item, index)} 
                    keyExtractor={item => item.title}
                    showsVerticalScrollIndicator={false}
                  />
              </View>
              
              <View style={[styles.section, styles.footer]}>
                  <TextInput style={[styles.input, { borderColor: list.color }]} 
                  onChangeText={text => this.setState({newTodo: text})} 
                  value={this.state.newTodo}
                  placeholder="food item" />

                  <TextInput style={[styles.input, { borderColor: list.color }]} 
                  onChangeText={text => this.setState({cals: text})}
                  keyboardType="numeric"
                  value={this.state.cals}
                  placeholder="portion's calories" />

                  <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                      <AntDesign name="plus" size={16} color={colors.white} />
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.green
  },
  taskCount: {
    marginTop: 2,
    marginBottom: 2,
    color: colors.blue,
    fontWeight: "600"
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16
  },
  deleteCalories: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 25
  
  }
});