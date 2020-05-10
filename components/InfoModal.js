import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default class InfoModal extends React.Component {
  state = {
    dueDate: "",
    oneDay: "",
    firstDate: "",
    secondDate: "",
    diffDays: "",
    weeks: "",
    id: "1"
  }

  setDue = () => {
    const { dueDate, id } = this.state;

    const lista = {dueDate, id}

    if(!info.some(lista => lista.id === this.state.id)){
      info.push({ id: this.state.id, dueDate: this.state.dueDate});

      this.props.addLista(lista);
    }

    this.setState({ dueDate: "", id: "1"});
    this.props.closeModal();
};

showPicker = () => {
  this.setState({
    isVisible: true
    
  })
}

handlerPicker = (date) => {
  this.setState({
    isVisible: false,
    dueDate: moment(date).format('DD[/]MM[/]YYYY')
  })
  //have to check how to use it and work on the articles
  //const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  //let firstDate = moment().format('YYYY[,] MM[,] DD');
  //const secondDate = {dueDate};
  //let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  //let { weeks } = diffDays;
}

hidePicker = () => {
  this.setState({
    isVisible: false
  })
}

CheckDueInput = () => {
  //Handler for the Submit onPress
  if (this.state.dueDate != '') {

      this.setDue()
  }else {
      alert('You must enter a due date to proceed');
  }
}

render(){
  return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
            <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                  <AntDesign name="close" size={24} color={colors.black}/>
            </TouchableOpacity>
            <View style={{ top: 180}}>
                <Text style={styles.title}>Select your baby's due date:</Text>

                <TouchableOpacity onPress={this.showPicker} style={styles.btnPicker}>
                      <Text>Select the date</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isVisible}
                      mode="date"
                      onConfirm={this.handlerPicker}
                      onCancel={this.hidePicker}
                    />

                  <Text style={{color: "pink", fontSize: 60}}>{this.state.dueDate} </Text>

                  <View style={{ flex: 1, alignSelf: "stretch", alignItems: "center"}}>

                    <TouchableOpacity
                            style={[styles.create,
                              {backgroundColor: colors.blue}]} 
                              onPress={this.CheckDueInput}
                              >
                        <Text style={{color: colors.white,
                          fontWeight: "600"}} >Set</Text>
                    </TouchableOpacity>
                  </View>
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
    width: 100,
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