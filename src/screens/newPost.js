
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            texto: "",
            error: "",
        };
    }

    handleNewPost() {
        const { texto } = this.state;

        if (!texto) {
            this.setState({ error: "El texto no puede estar vacío." });
            return;
        }

        db.collection("posts")
        
            .add({
                text: texto,
                user: auth.currentUser.email,
                createdAt: Date.now(),
                likes: []
                //preguntar el lunes si usamos date.now para fechas
            })
            .then(() => {
                this.setState({ texto: "", error: "" });
                this.props.navigation.navigate("Home");
            })
            .catch(() => {
                this.setState({ error: "Hubo una falla al crear el posteo." });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¡Crea un posteo!</Text>
                <TextInput
                    style={styles.field}
                    placeholder="Describe lo que deseas subir..."
                    onChangeText={(text) => this.setState({ texto: text })}
                    value={this.state.texto}
                />
                {this.state.error ? (
                    <Text style={styles.error}>{this.state.error}</Text>
                ) : null}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleNewPost()}
                >
                    <Text style={styles.buttonText}>CREAR</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "rgb(90, 90, 90)",
    },
    field: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        margin: 7,
        borderColor: "gray",
        borderRadius: 8,
        backgroundColor: "white",
    },
    button: {
        backgroundColor: "rgb(60, 60, 60)",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});


  
  
    
    
   
   
