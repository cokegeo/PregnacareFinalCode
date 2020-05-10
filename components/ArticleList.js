import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import EachArticleModal from "./EachArticleModal"


export default class ArticleList extends React.Component {
    state = {
        showListVisible: false
    };

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    };

    render() {
        const list = this.props.list
        const lista = this.props.lista;
        return (
            <View>
                
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()} >
                    <EachArticleModal list={list} closeModal={() => this.toggleListModal()} />
                </Modal>

                <TouchableOpacity style={[styles.listContainer, {backgroundColor: colors.pink} ]} 
                onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                    {list.title}
                    </Text>

                    <View style={{alignItems: "center"}} >
                    <Image style={styles.image}
                        source={{uri: list.imageURL}}
                    />
                    </View>


                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginVertical: 12,
        alignItems: "center",
        width: 280,
        height: 250,
        opacity: 0.85
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    },
      image: {
        width: 240,
        height: 160,
        borderRadius: 20
  }
});
