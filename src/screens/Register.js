import React, { Component } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            password: "",
        };
    }

    register(email, password, user) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection("users")
                    .add({
                        mail: email,
                        user: user,
                    })
                    .then(() => {
                        this.setState({ registered: true });
                        this.props.navigation.navigate("Login");
                    });
            })
            .catch(error => {
                this.setState({ error: "Fallo en el registro." });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¡Crea tu cuenta!</Text>

                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.field}
                    placeholder="Username"
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />

                <TextInput
                    style={styles.field}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        this.register(this.state.email, this.state.password, this.state.user)
                    }
                >
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    loginLink: {
        color: "rgb(60, 60, 60)",
        marginTop: 20,
        textDecorationLine: "underline",
    },
});
