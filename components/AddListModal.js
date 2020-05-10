import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, useState } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default class AddListModal extends React.Component {
  backgroundColors = ["#5CD859",
  "#24A6D9",
  "#595BD9",
  "#8022D9",
  "#D159D8",
  "#D85963",
  "#D88559",
  "#FBF785",
  "#DAC7BC",
  "#FFFFFF"];

  state = {
        name: "", //Here creates the list (date)
        color: "white",
        totalCalories: "1800",
        timestamp: "",
        chosenDate: ""
         //Here create the number of calories. This will depend on pregnancy week
    };

  createTodo = () => {
      const { name, color, totalCalories, timestamp } = this.state;
      const list = { name, color, totalCalories, timestamp };
      
      if(!lists.some(list => list.name === this.state.name)){
        info.push({ name: this.state.name});
  
        this.props.addList(list);
      }

      //this.props.addList(list);

      this.setState({ name: "", totalCalories: 0});
      this.props.closeModal();
  };

renderColors(){
      return this.backgroundColors.map(color => {
          return(
              <TouchableOpacity
              key={color}
              style={[styles.colorSelect,
                {backgroundColor: color}]}
                onPress={() => this.setState({ color,
                  name: moment().format('DD[/]MM[/]YYYY'),
                  timestamp: moment().format('YYYYMMDDHHmm')
                 } )}
                />
          )
      })
  };

  

  render(){
      return(
          <KeyboardAvoidingView style={styles.container} behavior="padding" >
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                      <AntDesign name="close" size={24} color={colors.black}/>
                </TouchableOpacity>

              

                <View style={{ alignSelf: "stretch", marginHorizontal: 32}}>
                      <Text style={[styles.title, {bottom: 60}, {textAlign: "center"}, {backgroundColor: "#E7EDDF"}, {borderRadius: 30}]}>
                        Select the amount of calories for today!!{"\n"}{"\n"}
                        Otherwise, by default 1800 cals
                      </Text>
                    <TextInput style={[styles.input, { borderColor: "black", bottom: 20 }]} 
                      onChangeText={text => this.setState({totalCalories: text})}
                      keyboardType="numeric"
                      value={this.state.totalCalories}
                      placeholder="Enter today's calories" />
                      
                      <Text style={styles.title}>
                        Select your color for today's list!
                      </Text>

                      <View style={{flexDirection: "row",
                      justifyContent: 'space-between',
                      marginTop: 12
                    }}>
                        {this.renderColors()}
                      </View>

                      <TouchableOpacity
                      style={[styles.create,
                        {backgroundColor: this.state.color}, {top: 100}]} 
                        onPress={this.createTodo}
                        >

                          <Text style={{color: colors.white,
                            fontWeight: "600"}} >Create!</Text>
                      </TouchableOpacity>
                </View>
          </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.black,
      alignSelf: 'center',
      marginBottom: 16
    },
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      borderColor: colors.blue,
      height: 50,
      marginTop: 8,
      paddingHorizontal: 16,
      fontSize: 18
    },
    create: {
      marginTop: 24,
      height: 50,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center"
    },
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4
    },
    btnPicker: {
      width: 250,
      height: 50,
      backgroundColor: colors.green,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      borderColor: colors.black,
      borderWidth: StyleSheet.hairlineWidth
      
    }
});
