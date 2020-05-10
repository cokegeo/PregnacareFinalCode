import React, { useCallback, useState } from 'react';
import { StyleSheet,
   Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator, YellowBox, Linking } from "react-native";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import InfoModal from "./components/InfoModal";
import Fire from "./Fire";
import _ from 'lodash';
import InfoLista from "./components/InfoLista";
import ArticleModal from "./components/ArticleModal";

YellowBox.ignoreWarnings(['Setting a timer']);

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    addInfoVisible: false,
    articlesVisible: false,
    lists: [],
    user: {},
    info: {},
    loading: true
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error){
        return alert("It seems that something went wrong");
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading: false});
        });
      });
      
      firebase.getInfo(info => {
        this.setState({info, user}, () => {
          this.setState({loading: false});
        });
      });


      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  };

  toggleAddTodoModal() {
      this.setState({addTodoVisible: !this.state.addTodoVisible});
  };

  toggleInfoModalModal() {
    this.setState({addInfoVisible: !this.state.addInfoVisible});
};

  toggleArticleModal() {
  this.setState({articlesVisible: !this.state.articlesVisible});
};

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  //check at this one as this return to yhe 
  renderLista = lista => {
    return <InfoLista lista={lista} updateLista={this.updateLista} />;
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      totalCalories: list.totalCalories,
      timestamp: list.timestamp,
      todos: []
    });

    

  };

  updateList = list => {
    firebase.updateList(list);
};

  addLista = lista => {
    firebase.addLista({
      id: lista.id,
      dueDate: lista.dueDate
    });
  };

  updateLista = lista => {
    firebase.updateLista(lista);
    };


  render() {
    if (this.state.loading) {
      return(
        <View style={styles.container} >
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      )
    }



    return (
      <View style={styles.container}>
          <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
              <AddListModal closeModal={() => this.toggleAddTodoModal()} 
              addList={this.addList} />
          </Modal>

          

          <Modal animationType="slide" visible={this.state.addInfoVisible} onRequestClose={() => this.toggleInfoModalModal()}>
              <InfoModal closeModal={() => this.toggleInfoModalModal()} 
              addLista={this.addLista}
               />
          </Modal>

          <Modal animationType="slide" visible={this.state.articlesVisible} onRequestClose={() => this.toggleArticleModal()}>
              <ArticleModal closeModal={() => this.toggleArticleModal()} 
               />
          </Modal>


          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignSelf: "stretch", paddingTop: 30, paddingLeft: 40}}>

            <FlatList
                data={this.state.info}
                keyExtractor={item => item.dueDate}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderLista( item )}
            />


            <View style={{ position: "absolute" , left: 270, top:28}} >
            <TouchableOpacity style={{ width: 150, flexDirection: "column", left: 60}} 
              onPress={() => this.toggleInfoModalModal()} >
                <AntDesign name="heart" size={16} color={colors.green} style={{ left: 15}}/>
                <Text>set due</Text> 
            </TouchableOpacity>
            </View>

          </View>
          <View style={{ flexDirection: "row", flex: 1, alignSelf: "stretch"}}>
              <View style={styles.divider} />
                <Text style={styles.title}>
                      Pregnacare <Text style={{fontWeight: "300", color: colors.blue }}>Health</Text>
                    
                </Text>
              <View style={styles.divider} />
          </View>



        <View style={{alignSelf: "stretch", flexDirection: "row"}}>

        <View style={{alignSelf: "stretch", justifyContent: "space-around" , flexDirection: "row", flex: 1 }}>
        <View style={{marginVertical: 40}}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()} >
                <AntDesign name="plus" size={20} color={colors.pink} />
            </TouchableOpacity>
            <Text style={styles.add}>New Day</Text>
        </View>
        <View style={{marginVertical: 40}}>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.freedieting.com/pregnancy-calorie-calculator")} >
                <MaterialCommunityIcons name="food-apple" size={35} color={colors.pink} style={{left: 8}} />
            </TouchableOpacity>
            <Text style={[styles.add, {textAlign: "center" }]}>Calculate{"\n"}Calories</Text>
        </View>

        <View style={{marginVertical: 40}}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleArticleModal()} >
                <MaterialIcons name="child-friendly" size={20} color={colors.pink} />
            </TouchableOpacity>
            <Text style={styles.add}>See Articles</Text>
        </View>

        </View>
        </View>

        <View style={{ height: 285, paddingLeft: 32 }}>
            <FlatList
                data={this.state.lists}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: "#E8E9E9",
        alignItems: "center",
        justifyContent: "center"
  },
  divider: {
        backgroundColor: colors.black,
        height: 1,
        flex: 1,
        alignSelf: "center"
  },
  title: {
      fontSize: 38,
      fontWeight: "800",
      color: colors.pink,
      paddingHorizontal: 64
  },
  addList: {
      width: 60,
      borderWidth: 2,
      borderColor: colors.pink,
      borderRadius: 30,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
  },
  add: {
      color: colors.blue,
      fontWeight: "600",
      fontSize: 14,
      marginTop: 8,
      alignItems: "center"
  }
});
