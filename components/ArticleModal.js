import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import articles from "../articles";
import ArticleList from "./ArticleList";

export default class ArticleModal extends React.Component {

renderList = list => {
  return <ArticleList list={list} />
}


render(){
  return(

        

      <View style={styles.container}>
        <TouchableOpacity style={{ position: "absolute", top: 80, right: 32 }} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.black}/>
        </TouchableOpacity>

        <View style={{ height: 600, paddingBottom: 32}}>
            <FlatList
                data={articles}
                keyExtractor={item => item.title}
                vertical={true}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => this.renderList(item)}
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
  }
});