import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import InfoModal from "./InfoModal";

export default class InfoLista extends React.Component {

  render (){

    const lista = this.props.lista;

    return (
      <View>
        <Text style={{ color: "green" }}>{lista.dueDate} </Text>
      </View>
    );
  }
};