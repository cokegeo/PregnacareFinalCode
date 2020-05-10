import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import articles from "../articles";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";

export default class EachArticleModal extends React.Component {
  state = {
    title: this.props.list.title,
    imageURL: this.props.list.imageURL,
    text: this.props.list.text
  }
  
  render() {
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={{position: 'absolute', top: 20, right: 32, zIndex: 10 }}
          onPress={this.props.closeModal}
          >
              <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <ScrollView vertical={true} >
            <View style={[styles.section, styles.header]}>
                <View>
                    <Image style={styles.image}
                                  source={{uri: this.state.imageURL}}
                    />
                    <Text style={styles.title}>
                      {this.state.title}
                    </Text>
                    <View style={styles.texto}>
                      <Text style={styles.text}>
                        {this.state.text}
                      </Text>
                    </View>
                </View>
            </View>
          </ScrollView>

        </SafeAreaView>
      );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
  },
  section: {
    flex: 1,
    alignSelf: "stretch"
  },
  image: {
    top: 3,
    alignSelf: "center",
    width: 400,
    height: 180,
    borderRadius: 20,
    opacity: 0.7,
    borderColor: "black",
    borderWidth: 2
  },
  title: {
    alignSelf: "center",
    borderBottomWidth: 6,
    borderBottomColor: "pink",
    fontSize: 30,
    color: "green",
    fontWeight: "900"
  },
  texto: {
    top: 10,
    backgroundColor: "#F9DEFB",
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 2
  },
  text: {
    top: 15,
    left: 5,
    right: 5,
    width: 380,
    height: 1400,
    fontSize: 18,
    textAlign: "justify"
  }
});