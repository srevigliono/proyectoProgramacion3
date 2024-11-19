import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { auth } from '../firebase/config';


export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: "",
    }
  }

  login(email, password) {

    if (!email) {
      this.setState({ error: "El campo de correo electrónico está vacío." });
      return;
    }

    if (!password) {
      this.setState({ error: "El campo de contraseña está vacío." });
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.navigation.navigate('HomeMenu')
        this.setState({ registered: true });
      })
      .catch(error => {
        this.setState({ error: 'Fallo en el inicio de sesión.' })
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>¡Iniciar Sesion!</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.button}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.loginLink}> No tienes cuenta? Crear Cuenta </Text>
        </TouchableOpacity>


      </View>
    )
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
    color: 'white',
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
  error: {
    color: "red"
  }
});


