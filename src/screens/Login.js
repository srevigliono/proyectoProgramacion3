import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { auth } from '../firebase/config';


export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

    login(email, password) {
      auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          this.props.navigation.navigate('HomeMenu')
          this.setState({ registered: true });
        })
        .catch(error => {
          this.setState({ error: 'Fallo en el registro.' })
        })
    }
  
  render() {
    return (
      <View>
        

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

        <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.field}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.cuenta}> No tienes cuenta? Crear Cuenta </Text>
        </TouchableOpacity>

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    padding: 15, // Ajustado para dar un aspecto más elegante
    backgroundColor: "#f0f0f0", // Color de fondo más claro y moderno
    justifyContent: "center",
    fontSize: 20, // Tamaño de fuente consistente
    fontWeight: "600", // Peso de fuente más sutil
    marginBottom: 15, // Espacio entre elementos más pequeño
    textAlign: "center",
    borderRadius: 10, // Bordes redondeados
    borderBottomWidth: 1,
    borderBottomColor: "#bbb", // Color de borde más suave
    shadowColor: "#000", // Agregando sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Sombra en Android
  },

  cuenta: {
    flex: 1,
    padding: 15,
    color: "#f5f5f5", // Color de texto más claro para contraste
    backgroundColor: "#333", // Fondo más sutil que negro puro
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#666", // Borde con más contraste
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});

